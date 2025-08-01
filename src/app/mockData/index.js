// Mock data for the FNAC Devis application
// This replaces all backend API calls with static data

export const mockStores = {
  data: {
    stores: [
      {
        store_id: 1,
        store_name: "FNAC Paris - Les Halles",
        store_code: "PAR001",
        address: "1-7 rue Pierre Lescot",
        city: "Paris",
        postcode: "75001"
      },
      {
        store_id: 2,
        store_name: "FNAC Lyon - Part-Dieu",
        store_code: "LYO001",
        address: "17 rue du Dr Bouchut",
        city: "Lyon",
        postcode: "69003"
      },
      {
        store_id: 3,
        store_name: "FNAC Marseille - Centre Bourse",
        store_code: "MAR001",
        address: "1 rue des Fabres",
        city: "Marseille",
        postcode: "13001"
      },
      {
        store_id: 4,
        store_name: "FNAC Toulouse - Wilson",
        store_code: "TOU001",
        address: "1 place du Président Thomas Wilson",
        city: "Toulouse",
        postcode: "31000"
      },
      {
        store_id: 5,
        store_name: "FNAC Nantes - Commerce",
        store_code: "NAN001",
        address: "1 rue Crébillon",
        city: "Nantes",
        postcode: "44000"
      }
    ]
  }
};

export const mockCurrentStore = {
  data: {
    vendor_store: {
      store_id: 1,
      store_name: "FNAC Paris - Les Halles",
      store_code: "PAR001",
      address: "1-7 rue Pierre Lescot",
      city: "Paris",
      postcode: "75001"
    }
  }
};

export const mockQuestions = {
  data: {
    quiz_questions: [
      {
        id: 1,
        label: "Quel type de borne de recharge souhaitez-vous installer ?",
        question_type: "DROPDOWN",
        responses: [
          { id: 1, label: "Câble attaché", sequence_number: 1 },
          { id: 2, label: "Prise T2S", sequence_number: 2 }
        ],
        current_response: null,
        required: true
      },
      {
        id: 2,
        label: "Quelle est la puissance souhaitée pour votre borne ?",
        question_type: "DROPDOWN",
        responses: [
          { id: 3, label: "3.7 kW", sequence_number: 1 },
          { id: 4, label: "7.4 kW", sequence_number: 2 },
          { id: 5, label: "11 kW", sequence_number: 3 },
          { id: 6, label: "22 kW", sequence_number: 4 }
        ],
        current_response: null,
        required: true
      },
      {
        id: 3,
        label: "Avez-vous un compteur électrique compatible ?",
        question_type: "DROPDOWN",
        responses: [
          { id: 7, label: "Oui", sequence_number: 1 },
          { id: 8, label: "Non", sequence_number: 2 },
          { id: 9, label: "Je ne sais pas", sequence_number: 3 }
        ],
        current_response: null,
        required: true
      },
      {
        id: 4,
        label: "Quel est votre budget approximatif ?",
        question_type: "DROPDOWN",
        responses: [
          { id: 10, label: "Moins de 500€", sequence_number: 1 },
          { id: 11, label: "500€ - 1000€", sequence_number: 2 },
          { id: 12, label: "1000€ - 2000€", sequence_number: 3 },
          { id: 13, label: "Plus de 2000€", sequence_number: 4 }
        ],
        current_response: null,
        required: true
      }
    ]
  }
};

export const mockTimeSlots = {
  data: [
    {
      id: 1,
      start: "2024-01-15 09:00",
      end: "2024-01-15 10:00",
      available: true
    },
    {
      id: 2,
      start: "2024-01-15 10:00",
      end: "2024-01-15 11:00",
      available: true
    },
    {
      id: 3,
      start: "2024-01-15 11:00",
      end: "2024-01-15 12:00",
      available: false
    },
    {
      id: 4,
      start: "2024-01-15 14:00",
      end: "2024-01-15 15:00",
      available: true
    },
    {
      id: 5,
      start: "2024-01-15 15:00",
      end: "2024-01-15 16:00",
      available: true
    },
    {
      id: 6,
      start: "2024-01-16 09:00",
      end: "2024-01-16 10:00",
      available: true
    },
    {
      id: 7,
      start: "2024-01-16 10:00",
      end: "2024-01-16 11:00",
      available: true
    },
    {
      id: 8,
      start: "2024-01-16 11:00",
      end: "2024-01-16 12:00",
      available: true
    },
    {
      id: 9,
      start: "2024-01-16 14:00",
      end: "2024-01-16 15:00",
      available: false
    },
    {
      id: 10,
      start: "2024-01-16 15:00",
      end: "2024-01-16 16:00",
      available: true
    }
  ]
};

export const mockDevis = {
  data: {
    reference: "DEV-2024-001",
    client: {
      firstName: "Jean",
      lastName: "Dupont",
      email: "jean.dupont@email.com",
      phoneNumber: "0123456789",
      address: "123 Rue de la Paix",
      postcode: "75001",
      city: "Paris"
    },
    store: {
      store_id: 1,
      store_name: "FNAC Paris - Les Halles",
      store_code: "PAR001"
    },
    borne: {
      type: "Câble attaché",
      puissance: "7.4 kW",
      prix: 1200
    },
    installation: {
      date: "2024-01-15",
      time: "10:00",
      technicien: "Pierre Martin"
    },
    total: 1200,
    status: "En attente de confirmation",
    created_at: "2024-01-10T10:30:00Z",
    devis_list: [
      {
        id: 1,
        date: "2024-01-10T10:30:00Z",
        devis_reference: "DEV-2024-001",
        recipient_name: "Jean Dupont",
        recipient_email: "jean.dupont@email.com",
        recipient_phone: "0123456789",
        status: "En attente de confirmation",
        total: 1200,
        borne_type: "Câble attaché",
        puissance: "7.4 kW"
      },
      {
        id: 2,
        date: "2024-01-08T14:20:00Z",
        devis_reference: "DEV-2024-002",
        recipient_name: "Marie Martin",
        recipient_email: "marie.martin@email.com",
        recipient_phone: "0987654321",
        status: "Confirmé",
        total: 1500,
        borne_type: "Prise T2S",
        puissance: "11 kW"
      },
      {
        id: 3,
        date: "2024-01-05T09:15:00Z",
        devis_reference: "DEV-2024-003",
        recipient_name: "Pierre Durand",
        recipient_email: "pierre.durand@email.com",
        recipient_phone: "0567891234",
        status: "En cours",
        total: 800,
        borne_type: "Câble attaché",
        puissance: "3.7 kW"
      }
    ]
  }
};

export const mockDevisStats = {
  total_devis: 45,
  devis_en_cours: 12,
  devis_confirmes: 28,
  devis_annules: 5,
  chiffre_affaires: 54000
};

export const mockUserData = {
  token_validity: "valid",
  email: "user@fnac.com",
  first_name: "Utilisateur",
  last_name: "FNAC"
};

export const mockUserPending = {
  data: {
    pending_user_id: "PENDING-" + Date.now(),
    status: "pending",
    created_at: new Date().toISOString()
  }
};

// Helper function to simulate API delay
export const simulateApiDelay = (ms = 500) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Helper function to simulate random success/failure
export const simulateApiSuccess = (successRate = 0.9) => {
  return Math.random() < successRate;
}; 