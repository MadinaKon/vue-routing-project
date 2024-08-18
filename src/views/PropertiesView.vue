<!-- <template>
  <h1>Real Estate Listings</h1>
  <div class="property-list">
    <div
      v-for="property in properties"
      :key="property.id"
      class="property-card"
    >
      <h2>{{ property.title }}</h2>
      <p><strong>Price:</strong> ${{ property.price }}</p>
      <p><strong>Location:</strong> {{ property.location }}</p>
      <p><strong>Type:</strong> {{ property.type }}</p>
      <p>{{ property.description }}</p>
      <button @click="editProperty(property)" class="property-form">
        Edit
      </button>
      <button @click="deleteProperty(property.id)" class="property-form">
        Delete
      </button>
    </div>
  </div>

  <form
    @submit.prevent="isEditing ? updateProperty() : createProperty()"
    class="property-form"
  >
    <input v-model="propertyForm.title" placeholder="Title" required />
    <input
      v-model="propertyForm.price"
      type="number"
      placeholder="Price"
      required
    />
    <input v-model="propertyForm.location" placeholder="Location" required />
    <input
      v-model="propertyForm.type"
      placeholder="Type (e.g., apartment, house)"
      required
    />
    <textarea
      v-model="propertyForm.description"
      placeholder="Description"
      required
    ></textarea>
    <button type="submit">
      {{ isEditing ? "Update Property" : "Add Property" }}
    </button>
    <button v-if="isEditing" type="button" @click="cancelEdit">Cancel</button>
  </form>
</template>

<script>
import axios from "axios";
import "@/styles/propertyStyles.css";

export default {
  data() {
    return {
      properties: [],
      isEditing: false,
      propertyForm: {
        id: null,
        title: "",
        price: 0,
        location: "",
        type: "",
        description: "",
      },
    };
  },
  created() {
    this.fetchProperties();
  },
  methods: {
    async fetchProperties() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/properties"
        );
        this.properties = response.data;
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    },
    async createProperty() {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/properties",
          this.propertyForm
        );
        this.properties.push(response.data);
        this.resetForm();
      } catch (error) {
        console.error("Error creating property:", error);
      }
    },
    editProperty(property) {
      this.isEditing = true;
      this.propertyForm = { ...property };
    },
    async updateProperty() {
      try {
        if (!this.propertyForm.id) {
          throw new Error(
            "Property ID is missing. Cannot update the property."
          );
        }
        const response = await axios.put(
          `http://localhost:3000/api/properties/${this.propertyForm.id}`,
          this.propertyForm
        );

        const index = this.properties.findIndex(
          (p) => p.id === this.propertyForm.id
        );
        if (index !== -1) {
          this.properties.splice(index, 1, response.data);
        }
        this.resetForm();
      } catch (error) {
        console.error("Error updating property:", error);
      }
    },
    async deleteProperty(id) {
      try {
        await axios.delete(`http://localhost:3000/api/properties/${id}`);

        this.properties = this.properties.filter((p) => p.id !== id);
      } catch (error) {
        console.error("Error deleting property:", error);
      }
    },
    cancelEdit() {
      this.resetForm();
    },
    resetForm() {
      this.isEditing = false;
      this.propertyForm = {
        id: null,
        title: "",
        price: 0,
        location: "",
        type: "",
        description: "",
      };
    },
  },
};
</script> -->
<template>
  <h1>Real Estate Listings</h1>
  <!-- Display existing properties -->
  <div class="property-list">
    <div
      v-for="property in properties"
      :key="property.id"
      class="property-card"
    >
      <h2>{{ property.title }}</h2>
      <p><strong>Price:</strong> ${{ property.price }}</p>
      <p><strong>Location:</strong> {{ property.location }}</p>
      <p><strong>Type:</strong> {{ property.type }}</p>
      <p>{{ property.description }}</p>
      <button @click="editProperty(property)" class="property-form">
        Edit
      </button>
      <button @click="deleteProperty(property.id)" class="property-form">
        Delete
      </button>
      <button @click="selectPropertyForAd(property.id)" class="property-form">
        Create Advertisement
      </button>

      <RouterLink :to="`/properties/${property.id}/advertisements`">
        <button class="view-ads-button">View Advertisements</button>
      </RouterLink>
    </div>
    <!-- Form to create an advertisement -->
    <div v-if="selectedPropertyId !== null" class="property-form">
      <h3>Create Advertisement for Property ID: {{ selectedPropertyId }}</h3>
      <form @submit.prevent="createAdvertisement">
        <input v-model="adForm.title" placeholder="Ad Title" required />
        <textarea
          v-model="adForm.description"
          placeholder="Ad Description"
          required
        ></textarea>
        <button type="submit">Create Advertisement</button>
        <button type="button" @click="cancelAdCreation">Cancel</button>
      </form>
    </div>
  </div>

  <!-- Form to create or update a property -->
  <form
    @submit.prevent="isEditing ? updateProperty() : createProperty()"
    class="property-form"
  >
    <input v-model="propertyForm.title" placeholder="Title" required />
    <input
      v-model="propertyForm.price"
      type="number"
      placeholder="Price"
      required
    />
    <input v-model="propertyForm.location" placeholder="Location" required />
    <input
      v-model="propertyForm.type"
      placeholder="Type (e.g., apartment, house)"
      required
    />
    <textarea
      v-model="propertyForm.description"
      placeholder="Description"
      required
    ></textarea>
    <button type="submit">
      {{ isEditing ? "Update Property" : "Add Property" }}
    </button>
    <button v-if="isEditing" type="button" @click="cancelEdit">Cancel</button>
  </form>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import "@/styles/propertyStyles.css";
import { RouterLink } from "vue-router";

export default {
  setup() {
    const properties = ref([]);
    const isEditing = ref(false);
    const propertyForm = ref({
      id: null,
      title: "",
      price: 0,
      location: "",
      type: "",
      description: "",
    });

    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/properties"
        );
        properties.value = response.data;
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    const createProperty = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/properties",
          propertyForm.value
        );
        properties.value.push(response.data);
        resetForm();
      } catch (error) {
        console.error("Error creating property:", error);
      }
    };

    const editProperty = (property) => {
      isEditing.value = true;
      propertyForm.value = { ...property };
    };

    const updateProperty = async () => {
      try {
        if (!propertyForm.value.id) {
          throw new Error(
            "Property ID is missing. Cannot update the property."
          );
        }
        const response = await axios.put(
          `http://localhost:3000/api/properties/${propertyForm.value.id}`,
          propertyForm.value
        );

        const index = properties.value.findIndex(
          (p) => p.id === propertyForm.value.id
        );
        if (index !== -1) {
          properties.value.splice(index, 1, response.data);
        }
        resetForm();
      } catch (error) {
        console.error("Error updating property:", error);
      }
    };

    const deleteProperty = async (id) => {
      try {
        await axios.delete(`http://localhost:3000/api/properties/${id}`);
        properties.value = properties.value.filter((p) => p.id !== id);
      } catch (error) {
        console.error("Error deleting property:", error);
      }
    };

    const cancelEdit = () => {
      resetForm();
    };

    const resetForm = () => {
      isEditing.value = false;
      propertyForm.value = {
        id: null,
        title: "",
        price: 0,
        location: "",
        type: "",
        description: "",
      };
    };

    const selectedPropertyId = ref(null);
    const adForm = ref({
      title: "",
      description: "",
    });

    const selectPropertyForAd = (propertyId) => {
      selectedPropertyId.value = propertyId;
    };

    const createAdvertisement = async () => {
      try {
        if (!selectedPropertyId.value) {
          throw new Error(
            "Property ID is missing. Cannot create advertisement."
          );
        }
        const response = await axios.post(
          `http://localhost:3000/api/properties/${selectedPropertyId.value}/advertisements`,
          adForm.value
        );
        console.log("Advertisement created:", response.data);
        resetAdForm();
      } catch (error) {
        console.error("Error creating advertisement:", error);
      }
    };

    const cancelAdCreation = () => {
      resetAdForm();
    };

    const resetAdForm = () => {
      selectedPropertyId.value = null;
      adForm.value = {
        title: "",
        description: "",
      };
    };

    onMounted(fetchProperties);

    return {
      properties,
      isEditing,
      propertyForm,
      fetchProperties,
      createProperty,
      editProperty,
      updateProperty,
      deleteProperty,
      cancelEdit,
      resetForm,
      selectedPropertyId,
      adForm,
      selectPropertyForAd,
      createAdvertisement,
      cancelAdCreation,
    };
  },
};
</script>
