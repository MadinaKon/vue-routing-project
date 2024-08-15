<template>
  <div>
    <h1>Real Estate Listings</h1>

    <!-- Form to create a new property -->
    <form @submit.prevent="createProperty" class="property-form">
      <input v-model="newProperty.title" placeholder="Title" required />
      <input
        v-model="newProperty.price"
        type="number"
        placeholder="Price"
        required
      />
      <input v-model="newProperty.location" placeholder="Location" required />
      <input
        v-model="newProperty.type"
        placeholder="Type (e.g., apartment, house)"
        required
      />
      <textarea
        v-model="newProperty.description"
        placeholder="Description"
        required
      ></textarea>
      <button type="submit">Add Property</button>
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
      </div>
    </div>
    <div>
      <!-- Property List with Edit Button -->
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

      <!-- Form to Update Property -->
      <div v-if="selectedProperty" class="property-form">
        <h3>Edit Property</h3>
        <form @submit.prevent="updateProperty">
          <input
            v-model="selectedProperty.title"
            placeholder="Title"
            required
          />
          <input
            v-model="selectedProperty.price"
            type="number"
            placeholder="Price"
            required
          />
          <input
            v-model="selectedProperty.location"
            placeholder="Location"
            required
          />
          <input
            v-model="selectedProperty.type"
            placeholder="Type (e.g., apartment, house)"
            required
          />
          <textarea
            v-model="selectedProperty.description"
            placeholder="Description"
            required
          ></textarea>
          <button type="submit">Update Property</button>
          <button type="button" @click="cancelEdit">Cancel</button>
        </form>
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
      newProperty: {
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
          this.newProperty
        );
        // Add the newly created property to the properties list
        this.properties.push(response.data);

        // Clear the form inputs
        this.newProperty = {
          title: "",
          price: 0,
          location: "",
          type: "",
          description: "",
        };
      } catch (error) {
        console.error("Error creating properties:", error);
      }
    },

    editProperty(property) {
      // Clone the property to avoid directly mutating the original data
      this.selectedProperty = { ...property };
    },
    async updateProperty() {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/properties/${this.selectedProperty.id}`,
          this.selectedProperty
        );

        // Update the local properties array with the updated data
        const index = this.properties.findIndex(
          (p) => p.id === this.selectedProperty.id
        );
        if (index !== -1) {
          this.properties.splice(index, 1, response.data);
        }

        // Clear the selected property and hide the form
        this.selectedProperty = null;
      } catch (error) {
        console.error("Error updating property:", error);
      }
    },
    cancelEdit() {
      // Clear the selected property and hide the form
      this.selectedProperty = null;
    },
  },
};
</script>
