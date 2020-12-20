<template>
  <div>
    <b-container>
      <BannerCarousel />
    </b-container>
    <b-container>
      <LandingPageSection imagePath="image/workspaces/workspace0.jpg">
        <div class="d-flex align-items-center landing-page-section">
          <div>
            <h3 class="font-weight-bold">Welcome to the workplace of tomorrow</h3>
            <p class="mt-3">
              From spaces that prioritize your health and safety to unmatched flexibility, WeWork is reimagining the workplace to give you the confidence to move forward through COVID-19 and beyond.
            </p>
            <router-link to="/about" class="text-decoration-none">
              <div class="d-flex align-items-center">
                <span class="mr-1">Learn more</span>
                <b-icon icon="arrow-right" font-scale="1" variant="primary" />
              </div>
            </router-link>
          </div>
        </div>
      </LandingPageSection>
      <LandingPageSection imagePath="image/workspaces/workspace1.jpg">
        <div class="d-flex align-items-center landing-page-section h-100">
          <div>
            <h3 class="font-weight-bold">Creating a healthier workplace</h3>
            <p class="mt-3">
              In response to COVID-19, we are enhancing our health and safety standards for your clients’ peace of mind.
            </p>
            <router-link to="/about" class="text-decoration-none">
              <div class="d-flex align-items-center">
                <span class="mr-1">Learn more</span>
                <b-icon icon="arrow-right" font-scale="1" variant="primary" />
              </div>
            </router-link>
          </div>
        </div>
      </LandingPageSection>
      <NavigateSection />
    </b-container>
    <b-container fluid>
      <MapSection linkTo="/about" />
    </b-container>
    <b-container>
      <SponsorSection />
      <BlogSection />
    </b-container>
  </div>
</template>

<script>
import BannerCarousel from './../components/BannerCarousel';
import LandingPageSection from './../components/LandingPageSection';
import NavigateSection from './../components/NavigateSection';
import MapSection from './../components/MapSection';
import SponsorSection from './../components/SponsorSection';
import BlogSection from './../components/BlogSection';

export default {
  name: 'Home',
  components: {
    BannerCarousel,
    LandingPageSection,
    NavigateSection,
    MapSection,
    SponsorSection,
    BlogSection
  },
  data() {
    return {
    }
  }
}
</script>

<style scoped>
  .h-100 {
    height: 100%;
  }
</style>
