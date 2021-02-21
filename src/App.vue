<template>
  <DynamicLayout>
    <div class="h-auto min-vh-100">
      <router-view :key="$route.fullPath" />
    </div>
  </DynamicLayout>
</template>

<script>
import DynamicLayout from './components/DynamicLayout';
import 'mapbox-gl/dist/mapbox-gl.css';

export default {
  components: {
    DynamicLayout
  }
}
</script>
