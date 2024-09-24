<template>
    <div class="min-h-screen bg-gray-100">
      <header class="bg-blue-600 text-white shadow-md">
        <div class="container mx-auto px-4 py-4 flex justify-between items-center">
          <div class="flex items-center">
            <Coffee class="h-8 w-8 mr-2" />
            <span class="text-2xl font-bold">RoomieHub</span>
          </div>
          <nav class="hidden md:flex space-x-4">
            <button class="text-white bg-transparent hover:bg-blue-700 px-3 py-2 rounded-md">Características</button>
            <button class="text-white bg-transparent hover:bg-blue-700 px-3 py-2 rounded-md">Precios</button>
            <router-link to="/dashboard">
              <button class="text-white border border-white hover:bg-blue-700 px-3 py-2 rounded-md">Iniciar sesión</button>
            </router-link>
            <router-link to="/register">
              <button class="bg-white text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md">Registrarse</button>
            </router-link>
          </nav>
          <button class="md:hidden text-white bg-transparent">
            <Menu class="h-6 w-6" />
          </button>
        </div>
      </header>
  
      <main class="container mx-auto px-4 py-8">
        <h1 class="text-4xl md:text-5xl font-bold text-center text-blue-600 mb-8">
          Organiza tu vida universitaria con RoomieHub 🎓🏠
        </h1>
  
        <div class="w-full max-w-4xl mx-auto">
          <div class="flex justify-center mb-6">
            <button 
              v-for="tab in tabs" 
              :key="tab.value"
              @click="activeTab = tab.value"
              :class="['px-4 py-2 rounded-t-lg', activeTab === tab.value ? 'bg-white text-blue-600' : 'bg-gray-200 text-gray-700']"
            >
              {{ tab.label }}
            </button>
          </div>
  
          <div class="bg-white rounded-lg shadow-md p-6">
            <div v-if="activeTab === 'community'">
              <img
                src="/placeholder.svg?height=400&width=800"
                alt="Grupo de estudiantes colaborando en tareas domésticas"
                class="w-full h-64 object-cover rounded-lg mb-6"
              />
              <h2 class="text-2xl font-bold text-blue-600 mb-4">Colabora con tus compañeros de piso</h2>
              <p class="text-gray-600 mb-6">
                Únete a una comunidad de estudiantes que trabajan juntos para mantener un hogar armonioso y organizado. Comparte responsabilidades, haz nuevos amigos y crea recuerdos inolvidables.
              </p>
            </div>
            <div v-else-if="activeTab === 'organization'">
              <img
                src="/placeholder.svg?height=400&width=800"
                alt="Interfaz de la app mostrando calendario y lista de tareas"
                class="w-full h-64 object-cover rounded-lg mb-6"
              />
              <h2 class="text-2xl font-bold text-blue-600 mb-4">Mantén tu vida estudiantil bajo control</h2>
              <p class="text-gray-600 mb-6">
                Organiza tus tareas domésticas, gastos compartidos y horarios de estudio en un solo lugar. RoomieHub te ayuda a equilibrar tu vida académica y personal con facilidad.
              </p>
            </div>
            <div v-else-if="activeTab === 'fun'">
              <img
                src="/placeholder.svg?height=400&width=800"
                alt="Estudiantes disfrutando de una fiesta en casa"
                class="w-full h-64 object-cover rounded-lg mb-6"
              />
              <h2 class="text-2xl font-bold text-blue-600 mb-4">Disfruta de la vida universitaria al máximo</h2>
              <p class="text-gray-600 mb-6">
                Organiza eventos, fiestas temáticas y noches de juegos con tus compañeros de piso. RoomieHub te ayuda a crear momentos divertidos mientras mantienes todo bajo control.
              </p>
            </div>
          </div>
        </div>
  
        <div class="mt-12 text-center">
          <router-link to="/register">
            <button class="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
              ¡Comienza gratis ahora! 🚀
            </button>
          </router-link>
        </div>
  
        <section class="mt-20">
          <h2 class="text-3xl font-bold text-center text-blue-600 mb-12">Características principales</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div v-for="feature in features" :key="feature.title" class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <component :is="feature.icon" class="h-12 w-12 text-blue-600 mb-4" />
              <h3 class="text-xl font-semibold text-blue-600 mb-2">{{ feature.title }}</h3>
              <p class="text-gray-600">{{ feature.description }}</p>
            </div>
          </div>
        </section>
  
        <section class="mt-20">
          <h2 class="text-3xl font-bold text-center text-blue-600 mb-12">Lo que dicen nuestros usuarios</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div v-for="testimonial in testimonials" :key="testimonial.name" class="bg-blue-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <p class="text-gray-600 mb-4">{{ testimonial.quote }}</p>
              <div class="flex items-center">
                <img
                  :src="testimonial.avatar"
                  :alt="`Foto de ${testimonial.name}`"
                  class="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <p class="font-semibold">{{ testimonial.name }}</p>
                  <p class="text-sm text-gray-500">{{ testimonial.title }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
  
      <footer class="bg-blue-600 text-white py-8 mt-20">
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap justify-between">
            <div class="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 class="text-lg font-semibold mb-2">RoomieHub</h3>
              <p class="text-blue-200">Simplifica tu vida universitaria</p>
            </div>
            <div class="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 class="text-lg font-semibold mb-2">Enlaces</h3>
              <ul class="space-y-2">
                <li><a href="#" class="text-blue-200 hover:text-white">Acerca de nosotros</a></li>
                <li><a href="#" class="text-blue-200 hover:text-white">Blog</a></li>
                <li><a href="#" class="text-blue-200 hover:text-white">Contacto</a></li>
              </ul>
            </div>
            <div class="w-full md:w-1/3">
              <h3 class="text-lg font-semibold mb-2">Suscríbete a nuestro boletín</h3>
              <form class="flex">
                <input type="email" placeholder="Tu email" class="flex-grow mr-2 px-3 py-2 rounded-md bg-blue-500 text-white placeholder-blue-200 border-blue-400" />
                <button type="submit" class="bg-white text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-md">Suscribir</button>
              </form>
            </div>
          </div>
          <div class="mt-8 pt-8 border-t border-blue-500 text-center text-blue-200">
            <p>&copy; 2023 RoomieHub. La app para roomies universitarios cool 😎</p>
          </div>
        </div>
      </footer>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { Coffee, Calendar, ShoppingCart, DollarSign, Menu } from 'lucide-vue-next'
  
  const activeTab = ref('community')
  
  const tabs = [
    { value: 'community', label: 'Comunidad' },
    { value: 'organization', label: 'Organización' },
    { value: 'fun', label: 'Diversión' }
  ]
  
  const features = [
    {
      icon: Calendar,
      title: 'Calendario compartido',
      description: 'Coordina fácilmente las tareas y eventos del hogar con todos tus compañeros de piso.'
    },
    {
      icon: ShoppingCart,
      title: 'Lista de compras colaborativa',
      description: 'Crea y actualiza listas de compras en tiempo real con tus compañeros de piso.'
    },
    {
      icon: DollarSign,
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