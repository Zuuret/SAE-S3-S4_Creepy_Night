<template>
  <div class="language-selector" @click="toggleDropdown">
    <div class="selected-option">
      <img :src="selectedImage" :alt="selectedText" />
      {{ selectedText }}
      <div class="chevron"></div>
    </div>
    <ul v-if="showDropdown" class="options">
      <li v-for="option in filteredOptions" :key="option.value" @click.stop="selectOption(option)">
        <img :src="option.imgSrc" :alt="option.text" /> {{ option.text }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDropdown: false,
      selectedImage: require("../assets/drapeau_France.png"),
      selectedText: "FR",
      selectedValue: "fr",
      options: [
        { value: "fr", imgSrc: require("../assets/drapeau_France.png"), text: "FR" },
        { value: "en", imgSrc: require("../assets/drapeau_Angleterre.png"), text: "EN" },
      ],
    };
  },
  computed: {
    filteredOptions() {
      return this.options.filter(option => option.value !== this.selectedValue);
    },
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    selectOption(option) {
      this.selectedImage = option.imgSrc;
      this.selectedText = option.text;
      this.selectedValue = option.value;
      this.showDropdown = false;
    },
  },
};
</script>

<style>
.language-selector {
  position: relative;
  display: inline-block;
  cursor: pointer;
  color: white;
  font-size: 50px;
  font-family: "Agency FB";
  font-weight: bold;
}
.selected-option {
  display: flex;
  align-items: center;
}
.selected-option img {
  width: 45px;
  height: 45px;
  margin-right: 5px;
}
.chevron {
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 30px solid #ff0000; /* Couleur de la flèche */
  display: inline-block;
  margin-left: 5px;
}
.options {
  list-style-type: none;
  padding: 0;
  margin: 5px 0 0;
  background-color: white;
  border: 1px solid #ccc;
  position: absolute;
  width: auto;
  z-index: 100;
  background-color: #332929;
}
.options li {
  padding: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.options li:hover {
  background-color: black;
}
.options img {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
</style>
