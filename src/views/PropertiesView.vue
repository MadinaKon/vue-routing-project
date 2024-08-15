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

<style>
/* Container for the property list */
.property-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

/* Individual property cards */
.property-card {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  transition: transform 0.3s, box-shadow 0.3s;
}

/* Card hover effects */
.property-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Property card title */
.property-card h2 {
  margin-top: 0;
  font-size: 1.5em;
  color: #333;
}

/* Property card details */
.property-card p {
  margin: 5px 0;
  color: #555;
}

/* Form styling */
.property-form {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
}

/* Input and textarea styling */
.property-form input,
.property-form textarea {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Form button styling */
.property-form button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.property-form button:hover {
  background-color: #0056b3;
}
</style>
