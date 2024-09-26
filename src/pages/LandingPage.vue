<template>
    <q-page class="q-pa-md">
      <div class="text-h2 text-primary text-center q-mb-xl">
        Organiza tu vida universitaria con RoomieHub 🎓🏠
      </div>
  
      <q-card class="my-card q-mb-xl">
        <q-tabs
          v-model="tab"
          dense
          class="text-primary"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="community" label="Comunidad" />
          <q-tab name="organization" label="Organización" />
          <q-tab name="fun" label="Diversión" />
        </q-tabs>
  
        <q-separator />
  
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="community">
            <q-img src="img/foto1.jpg" height="250px" class="rounded-borders q-mb-md" />
            <div class="text-h5 text-primary q-mb-md">Colabora con tus compañeros de piso</div>
            <p class="text-body1">
              Únete a una comunidad de estudiantes que trabajan juntos para mantener un hogar armonioso y organizado. Comparte responsabilidades, haz nuevos amigos y crea recuerdos inolvidables.
            </p>
          </q-tab-panel>
  
          <q-tab-panel name="organization">
            <q-img src="img/foto2.webp" height="250px" class="rounded-borders q-mb-md" />
            <div class="text-h5 text-primary q-mb-md">Mantén tu vida estudiantil bajo control</div>
            <p class="text-body1">
              Organiza tus tareas domésticas, gastos compartidos y horarios de estudio en un solo lugar. RoomieHub te ayuda a equilibrar tu vida académica y personal con facilidad.
            </p>
          </q-tab-panel>
  
          <q-tab-panel name="fun">
            <q-img src="img/foto3.jpg" height="250px" class="rounded-borders q-mb-md" />
            <div class="text-h5 text-primary q-mb-md">Disfruta de la vida universitaria al máximo</div>
            <p class="text-body1">
              Organiza eventos, fiestas temáticas y noches de juegos con tus compañeros de piso. RoomieHub te ayuda a crear momentos divertidos mientras mantienes todo bajo control.
            </p>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
  
      <div class="text-center q-mb-xl">
        <q-btn
          size="lg"
          color="primary"
          label="¡Comienza ahora, no esperes más! 🚀"
          to="/register"
        />
      </div>
  
      <div class="text-h3 text-primary text-center q-mb-xl">Características principales</div>
  
      <div class="row q-col-gutter-md q-mb-xl">
        <div class="col-12 col-md-4" v-for="feature in features" :key="feature.title">
          <q-card class="my-card">
            <q-card-section>
              <q-icon :name="feature.icon" size="4em" color="primary" />
              <div class="text-h6 q-mt-sm q-mb-xs">{{ feature.title }}</div>
              <p class="text-body2">{{ feature.description }}</p>
            </q-card-section>
          </q-card>
        </div>
      </div>
  
      <div class="text-h3 text-primary text-center q-mb-xl">Lo que dicen nuestros usuarios</div>
  
      <div class="row q-col-gutter-md q-mb-xl">
        <div class="col-12 col-md-4" v-for="testimonial in testimonials" :key="testimonial.name">
          <q-card class="my-card">
            <q-card-section>
              <p class="text-body2 q-mb-md">{{ testimonial.quote }}</p>
              <div class="row items-center">
                <q-avatar size="40px">
                  <img :src="testimonial.avatar" :alt="`Foto de ${testimonial.name}`">
                </q-avatar>
                <div class="q-ml-sm">
                  <div class="text-weight-bold">{{ testimonial.name }}</div>
                  <div class="text-caption">{{ testimonial.title }}</div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-page>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const tab = ref('community')
  
  const features = [
    {
      icon: 'event',
      title: 'Calendario compartido',
      description: 'Coordina fácilmente las tareas y eventos del hogar con todos tus compañeros de piso.'
    },
    {
      icon: 'shopping_cart',
      title: 'Lista de compras colaborativa',
      description: 'Crea y actualiza listas de compras en tiempo real con tus compañeros de piso.'
    },
    {
      icon: 'attach_money',
      title: 'División de gastos',
      description: 'Lleva un registro claro de los gastos compartidos y divide las cuentas fácilmente.'
    }
  ]
  
  const testimonials = [
    {
      quote: "RoomieHub ha hecho que vivir con compañeros de piso sea mucho más fácil y divertido. ¡Ya no discutimos por las tareas del hogar!",
      name: "Ana G.",
      title: "Estudiante de Psicología",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    {
      quote: "Gracias a RoomieHub, puedo concentrarme en mis estudios sin preocuparme por los conflictos en casa. ¡Es genial!",
      name: "Carlos M.",
      title: "Estudiante de Ingeniería",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    {
      quote: "La función de división de gastos es increíble. Ahora todos pagamos lo que nos corresponde sin complicaciones.",
      name: "Laura S.",
      title: "Estudiante de Economía",
      avatar: "/placeholder.svg?height=40&width=40"
    }
  ]
  </script>
  
  <style lang="scss" scoped>
  .my-card {
    width: 100%;
    max-width: 350px;
    margin: 0 auto;
  }
  </style>