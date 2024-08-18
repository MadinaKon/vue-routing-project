<!-- <template>
  <div>
    <h1>Advertisements</h1>
    <div v-if="advertisements.length === 0">No advertisements found.</div>
    <div v-else class="ad-list">
      <div v-for="ad in advertisements" :key="ad.id" class="ad-card">
        <h2>{{ ad.title }}</h2>
        <p><strong>Property ID:</strong> {{ ad.propertyId }}</p>
        <p>{{ ad.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import "@/styles/advertisementStyles.css";

export default {
  setup() {
    const advertisements = ref([]);

    const fetchAdvertisements = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/advertisements"
        );
        advertisements.value = response.data;
      } catch (error) {
        console.error("Error fetching advertisements:", error);
      }
    };

    onMounted(fetchAdvertisements);

    return {
      advertisements,
    };
  },
};
</script> -->
<template>
  <div>
    <h1>Advertisements for Property ID: {{ propertyId }}</h1>
    <div v-if="advertisements.length === 0">No advertisements found.</div>
    <div v-else class="ad-list">
      <div v-for="ad in advertisements" :key="ad.id" class="ad-card">
        <h2>{{ ad.title }}</h2>
        <p><strong>Property ID:</strong> {{ ad.propertyId }}</p>
        <p>{{ ad.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const propertyId = route.params.propertyId;
    const advertisements = ref([]);

    const fetchAdvertisements = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/properties/${propertyId}/advertisements`
        );
        advertisements.value = response.data;
        console.log(advertisements);
      } catch (error) {
        console.error("Error fetching advertisements:", error);
      }
    };

    onMounted(fetchAdvertisements);

    return {
      propertyId,
      advertisements,
    };
  },
};
</script>
