<template>
  <div>
    <h1>Real Estate Listings</h1>

    <!-- Form to create a new property -->
    <form @submit.prevent="createProperty">
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

    <div v-for="property in properties" :key="property.id" class="property">
      <h2>{{ property.title }}</h2>
      <p>Price: ${{ property.price }}</p>
      <p>Location: {{ property.location }}</p>
      <p>Type: {{ property.type }}</p>
      <p>Description: {{ property.description }}</p>
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
      // try {
      //   const request = await axios.post(
      //     "http://localhost:3000/api/properties"
      //   );
      // }
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
.property {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
}

form {
  margin-bottom: 20px;
}

input,
textarea {
  display: block;
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
  max-width: 400px;
  border: 1px solid black;
}

button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
