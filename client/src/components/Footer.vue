<template>
  <div class="bg-gray">
    <b-container class="py-5">
      <b-row>
        <b-col lg="2" md="6" sm="6" xs="12" class="mt-lg-0 mt-md-4 mt-sm-4 mt-xs-4">
          <span class="footer-section d-block mb-3">COMPANY</span>
          <span class="mb-1 d-block">Global Locations</span>
          <span class="mb-1 d-block">Mission</span>
          <span class="mb-1 d-block">Careers</span>
          <span class="mb-1 d-block">Investors</span>
          <span class="mb-1 d-block">Newsroom</span>
        </b-col>
        <b-col lg="2" md="6" sm="6" xs="12" class="mt-lg-0 mt-md-4 mt-sm-4 mt-xs-4">
          <span class="footer-section d-block mb-3">PARTNERSHIPS</span>
          <span class="mb-1 d-block">Brokers</span>
          <span class="mb-1 d-block">Landlords</span>
          <span class="mb-1 d-block">Refer a Friend</span>
          <span class="mb-1 d-block">Event Planners</span>
          <span class="mb-1 d-block">Referral Partners</span>
        </b-col>
        <b-col lg="2" md="6" sm="6" xs="12" class="mt-lg-0 mt-md-4 mt-sm-4 mt-xs-4">
          <span class="footer-section d-block mb-3">IMPACT</span>
          <span class="mb-1 d-block">Ideas</span>
          <span class="mb-1 d-block">Refugee Initiative</span>
          <span class="mb-1 d-block">Veterans in Residence</span>
        </b-col>
        <b-col lg="2" md="6" sm="6" xs="12" class="mt-lg-0 mt-md-4 mt-sm-4 mt-xs-4">
          <span class="footer-section d-block mb-3">SUPPORT</span>
          <span class="mb-1 d-block">COVID Response</span>
          <span class="mb-1 d-block">FAQ</span>
          <span class="mb-1 d-block">Contact Us</span>
        </b-col>
        <b-col lg="4" md="12" sm="12" xs="12">
          <div class="footer-social-icon d-flex justify-content-between">
            <a class="text-decoration-none" href="#">
              <b-icon icon="facebook" variant="dark"></b-icon>
            </a>

            <a class="text-decoration-none" href="#">
              <b-icon icon="instagram" variant="dark"></b-icon>
            </a>

            <a class="text-decoration-none" href="#">
              <b-icon icon="twitter" variant="dark"></b-icon>
            </a>

            <a class="text-decoration-none" href="#">
              <b-icon icon="linkedin" variant="dark"></b-icon>
            </a>
          </div>
        </b-col>
        <b-col lg="6" md="12" sm="12" xs="12">
          <div class="address-info mt-5">
            <a href="#">+84 28 4458 2344</a>
            <span class="mt-2 d-block">272 Nguyen Van Cu Q5</span>
            <span class="mt-2 d-block">TPHCM, 700000</span>
          </div>
        </b-col>

        <b-col lg="6" md="12" sm="12" xs="12">
          <div class="policy-info mt-md-4 mt-sm-4 mt-xs-4">
            <div class="policy-items">
              <a class="mr-4" href="#">Privacy</a>
              <a class="mr-4" href="#">Terms</a>
              <a class="mr-4" href="#">Cookies</a>
              <a class="mr-4" href="#">Accessibility</a>
              <a href="#">Sitemap</a>
              <p class="mt-2" style="color: #666666;">Copyright © 2020 WeWork Companies Inc. All rights reserved</p>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
  .bg-gray {
    background: #f7f7f7;
  }

  .footer-section {
    color: #666666;
    font-size: 80%;
  }

  @media only screen and (max-width: 600px) {
    .footer-social-icon {
      margin-top: 40px;
    }
  }

  /* Small devices (portrait tablets and large phones, 600px and up) */
  @media only screen and (min-width: 600px) {
    .footer-social-icon {
      margin-top: 40px;
    }
  }

  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    .footer-social-icon {
      float: left;
      width: 50%;
      margin-top: 40px;
    }
  }

  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
    .footer-social-icon {
      float: right;
      width: 50%;
    }
  }

  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media only screen and (min-width: 1200px) {
    .footer-social-icon {
      float: right;
      width: 50%;
    }

    .policy-items {
      margin-top: 60px;
      float: right;
    }
  }
</style>
