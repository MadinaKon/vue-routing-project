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
  },
};
</script>
