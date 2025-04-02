<template>
  <div class="form-container">
    <div>
      <router-link :to="`/expo`">
        <button>{{ $t('back_to_expo') }}</button>
      </router-link>
    </div>

    <div class="form-box">

      <h2>{{ $t('registration') }}</h2>

      <form @submit.prevent="submitForm" class="form-content">
        <!-- User fields (arranged in a column) -->
        <div>
          <div class="form-group">
            <label>{{ $t('name_surname') }} :</label>
            <input type="text" :placeholder="$t('enter_creator_name')" v-model="form.createur" />
          </div>

          <div class="form-group">
            <label>{{ $t('creation_date') }} :</label>
            <input type="date" placeholder="jj/mm/aaaa" v-model="form.dateCrea" />
          </div>

          <div class="form-group">
            <label>{{ $t('description') }} :</label>
            <input type="text" :placeholder="$t('enter_description')" v-model="form.description" />
          </div>

          <div class="form-group">
            <label>{{ $t('email') }} :</label>
            <input type="email" :placeholder="$t('enter_email')" v-model="form.email" />
          </div>

          <div class="form-group">
            <label>{{ $t('confirm_email') }} :</label>
            <input type="email" :placeholder="$t('confirm_email')" v-model="form.confirmEmail" />
          </div>
          <div class="form-group">
            <label>{{ $t('image') }} :</label>
            <input type="file" v-bind="form.image" name="filename" />
          </div>
        </div>

        <button type="submit" class="submit-button" @click="submitForm">{{ $t('confirm_registration') }}</button>
      </form>

      <div v-if="message" class="message">{{ message }}</div>
    </div>
  </div>
</template>


<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      form: {
        createur: '',
        dateCrea: '',
        description: '',
        image: '',
        email: '',
        confirmEmail: '',
      },
      message: ''
    };
  },
  methods: {
    ...mapActions(['setOeuvre']),
    submitForm() {
      if ((this.form.createur != '') && (this.form.email != '') && (this.form.dateCrea != '') && (this.form.description != '') && (this.form.image != '')) {
        if (this.form.email != this.form.confirmEmail) {
          this.message = "L'email n'est pas identique à l'email de confirmation";
        } else {
          this.message = "Demande d'emplacement envoyée.";
          this.setOeuvre([this.form.createur,this.form.email,this.form.dateCrea,this.form.description,this.form.image]);
        }
      } else {
        this.message = "Une information est manquante.";
      }
    }
  }
};
</script>

<style scoped>

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  margin-bottom: 15px;
}

.user-type-tabs {
  display: flex;
  gap: 20px;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 15px;
}

.user-type-tabs span {
  cursor: pointer;
}

.user-type-tabs .active {
  color: blue;
  text-decoration: underline;
}

.form-box {
  width: 350px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

.form-content {
  display: flex;
  flex-direction: column;
}

.form-content label {
  font-weight: bold;
  margin-top: 10px;
}

.form-content input {
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-button {
  margin-top: 15px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}

.message {
  color: green;
  font-weight: bold;
  margin-top: 15px;
  text-align: center;
}
</style>