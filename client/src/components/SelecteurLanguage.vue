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
      selectedValue: localStorage.getItem("language") || "fr", // Charge la langue sauvegardée
      options: [
        { value: "fr", imgSrc: require("../assets/drapeau_France.png"), text: "FR" },
        { value: "en", imgSrc: require("../assets/drapeau_Angleterre.png"), text: "EN" },
      ],
    };
  },
  computed: {
    selectedImage() {
      return this.options.find(opt => opt.value === this.selectedValue)?.imgSrc;
    },
    selectedText() {
      return this.options.find(opt => opt.value === this.selectedValue)?.text;
    },
    filteredOptions() {
      return this.options.filter(option => option.value !== this.selectedValue);
    },
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    selectOption(option) {
      this.selectedValue = option.value;
      this.showDropdown = false;
      this.$i18n.locale = option.value;
      localStorage.setItem("language", option.value);
    },
  },
  mounted() {
    this.$i18n.locale = this.selectedValue;
  },
};
</script>


<style>
.language-selector {
  position: relative;
  display: inline-block;
  cursor: pointer;
  color: white;
  font-size: 35px;
  font-family: "Agency FB";
  font-weight: bold;
}
.selected-option {
  display: flex;
  align-items: center;
}
.selected-option img {
  width: 30px;
  height: 30px;
  margin-right: 5px;
}
.chevron {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 20px solid #ff0000; /* Couleur de la flèche */
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

@media (max-width: 1024px) {
  .language-selector {
    font-size: 30px;
  }

  .selected-option img {
    width: 25px;
    height: 25px;
  }

  .chevron {
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 16px solid #ff0000;
  }

  .options img {
    width: 18px;
    height: 18px;
  }
}

@media (max-width: 768px) {
  .language-selector {
    font-size: 25px;
  }

  .selected-option img {
    width: 20px;
    height: 20px;
  }

  .chevron {
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 12px solid #ff0000;
  }

  .options img {
    width: 16px;
    height: 16px;
  }
}

@media (max-width: 480px) {
  .language-selector {
    font-size: 20px;
  }

  .selected-option img {
    width: 15px;
    height: 15px;
  }

  .chevron {
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 10px solid #ff0000;
  }

  .options img {
    width: 14px;
    height: 14px;
  }
}
</style>
