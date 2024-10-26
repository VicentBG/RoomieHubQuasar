import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRoomieStore = defineStore('roomie',() => {

    /* state */
    const roomies = ref([
        {
            email: "1234@1234.com",
            password: "1234vbg"
        }
    ])
    const logged = ref(false)
    const events = ref([
    {
        id: 1,
        title: 'Limpiar la cocina',
        date: '2024-10-05',
        time: '10:00',
        type: 'tarea',
        description: 'Limpiar a fondo la cocina, incluyendo el horno y la nevera.',
        assignedTo: 'Ana',
        bgcolor: 'orange'
    },
    {
        id: 2,
        title: 'Pagar el alquiler',
        date: '2024-10-01',
        time: '09:00',
        type: 'pago',
        description: 'Transferir el dinero del alquiler al propietario.',
        bgcolor: 'red'
    },
    {
        id: 3,
        title: 'Fiesta de cumpleaños de Carlos',
        date: '2024-10-20',
        time: '20:00',
        type: 'evento',
        description: 'Celebración del cumpleaños de Carlos en el salón común.',
        bgcolor: 'green'
    },
    {
        id: 4,
        title: 'Comprar suministros',
        date: '2024-10-10',
        time: '16:00',
        type: 'tarea',
        description: 'Comprar papel higiénico, detergente y otros suministros para el piso.',
        assignedTo: 'Elena',
        bgcolor: 'blue'
    },
    {
        id: 5,
        title: 'Noche de películas',
        date: '2024-10-25',
        time: '21:00',
        type: 'evento',
        description: 'Noche de películas con todos los compañeros de piso.',
        bgcolor: 'purple'
    },
    {
        id: 6,
        title: 'Reunión para planificar la cena de Acción de Gracias',
        date: '2024-11-02',
        time: '19:00',
        type: 'evento',
        description: 'Decidir el menú, comprar los ingredientes y asignar tareas.',
        bgcolor: 'brown'
    },
    {
        id: 7,
        title: 'Limpiar el baño',
        date: '2024-11-15',
        time: '14:00',
        type: 'tarea',
        description: 'Limpiar a fondo el baño, incluyendo el inodoro, el lavabo y la ducha.',
        assignedTo: 'Pedro',
        bgcolor: 'orange'
    },
    {
        id: 8,
        title: 'Pagar la factura de la luz',
        date: '2024-11-20',
        time: '15:00',
        type: 'pago',
        description: 'Realizar el pago de la factura de la luz.',
        bgcolor: 'red'
    },
    {
        id: 9,
        title: 'Salida al cine',
        date: '2024-11-28',
        time: '20:30',
        type: 'evento',
        description: 'Ir al cine a ver la última película.',
        bgcolor: 'green'
    },
    {
        id: 10,
        title: 'Día de limpieza general',
        date: '2024-11-08',
        time: '10:00',
        type: 'tarea',
        description: 'Limpiar todas las áreas comunes del piso.',
        assignedTo: 'Todos',
        bgcolor: 'blue'
    }
    ])

    /* actions */
    function log() {
        logged.value = true
    }

    function logout() {
        logged.value = false
    }

    function addRoomie(roomie) {
        roomies.value.push(roomie)  
    }

    function addEvent(event) {
        events.value.push(event)
    }

    return { 
        /* state */
        roomies,
        logged,
        events,

        /* actions */
        log,
        logout,
        addRoomie,
        addEvent
    }
});
