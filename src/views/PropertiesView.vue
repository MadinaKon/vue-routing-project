<template>
  <div>
    <h1>Real Estate Listings</h1>
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
  },
};
</script>

<style>
.property {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
}
</style>
