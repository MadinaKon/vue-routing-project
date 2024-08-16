<template>
  <div>
    <h1>Real Estate Listings</h1>

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
        <button @click="editProperty(property)">Edit</button>
      </div>
    </div>
  </div>
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
</script>
