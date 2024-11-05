<template>
  <q-page class="flex flex-center">
    <div class="about-me-container q-pa-md">
      <h1 class="text-h3 text-center q-mb-xl">
        Sobre RoomieHub: ¡Donde los Compis de Piso se Convierten en Leyendas! 🦸‍♂️🦸‍♀️
      </h1>

      <q-card class="my-card q-mb-md">
        <q-card-section>
          <div class="text-h6">Nuestra Misión Imposible 🕵️‍♂️</div>
          <p class="q-mt-sm">
            En RoomieHub, nos hemos propuesto la tarea más difícil del universo: hacer que vivir con compañeros de piso
            sea más divertido que un maratón de memes de gatos. ¿Imposible, dices? ¡Ja! Para nosotros, imposible es solo
            el nombre de un perfume.
          </p>
        </q-card-section>
      </q-card>

      <q-card class="my-card q-mb-md">
        <q-card-section>
          <div class="text-h6">Nuestro Equipo de Superhéroes 🦸‍♂️🦸‍♀️</div>
          <p class="q-mt-sm">
            Nuestro equipo está formado por ex-compañeros de piso que han sobrevivido a guerras de platos sucios,
            batallas épicas por el control remoto y el temido "quién se acabó la leche". Ahora, usan sus poderes para el
            bien.
          </p>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-list>
            <q-item v-for="hero in teamHeroes" :key="hero.name">
              <q-item-section avatar>
                <q-avatar>
                  <q-icon :name="hero.icon" color="primary" size="40px" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ hero.name }}</q-item-label>
                <q-item-label caption>{{ hero.power }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>

      <q-card class="my-card q-mb-md">
        <q-card-section>
          <div class="text-h6">Nuestras Armas Secretas 🔫</div>
          <p class="q-mt-sm">
            En RoomieHub, no solo te ayudamos a encontrar el compañero de piso perfecto. Te damos las herramientas para
            convertirte en el Maestro Jedi de la convivencia:
          </p>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-list>
            <q-item v-for="(weapon, index) in secretWeapons" :key="index">
              <q-item-section avatar>
                <q-icon :name="weapon.icon" color="secondary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ weapon.name }}</q-item-label>
                <q-item-label caption>{{ weapon.description }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>

      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">Nuestra Garantía 💯</div>
          <p class="q-mt-sm">
            Garantizamos que con RoomieHub, tu vida de estudiante será más emocionante que una fiesta universitaria y
            más organizada que la biblioteca en época de exámenes. Y si no... bueno, al menos tendrás grandes historias
            para contar.
          </p>
        </q-card-section>

        <q-card-actions vertical align="center">
          <q-btn color="primary" label="¡Únete a la Locura!" icon="rocket_launch" to="/register" />
          <q-btn flat color="secondary" label="O Vuelve a la Cordura" icon="arrow_back" to="/" />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const teamHeroes = ref([
  { name: 'La Reina del Tupperware', icon: 'kitchen', power: 'Puede etiquetar 100 tupperwares en 60 segundos' },
  { name: 'El Susurrador de Lavadoras', icon: 'local_laundry_service', power: 'Nunca mezcla los colores con los blancos' },
  { name: 'El Ninja del Silencio', icon: 'volume_off', power: 'Puede ver Netflix a las 3 AM sin despertar a nadie' },
  { name: 'La Domadora de Facturas', icon: 'receipt_long', power: 'Hace que los gastos compartidos sean indoloros' }
])

const secretWeapons = ref([
  { name: 'El Calendario Mágico', icon: 'event', description: 'Donde las tareas domésticas se organizan solas (o eso esperamos)' },
  { name: 'El Chat del Destino', icon: 'chat', description: 'Para resolver conflictos o decidir qué pedir para cenar' },
  { name: 'La Lista de la Compra Infinita', icon: 'shopping_cart', description: 'Porque siempre falta algo en la nevera' },
  { name: 'El Medidor de Buen Rollo', icon: 'sentiment_satisfied', description: 'Para mantener la paz y la armonía (y saber cuándo es hora de una fiesta de reconciliación)' }
])
</script>

<style scoped>
.about-me-container {
  max-width: 800px;
  width: 100%;
}

.my-card {
  width: 100%;
  max-width: 100%;
  background-color: #f0f4f8;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.my-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

@media (max-width: 599px) {
  .text-h3 {
    font-size: 2rem;
  }
}
</style>
