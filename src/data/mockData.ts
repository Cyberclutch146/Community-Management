export interface User {
  id: string;
  name: string;
  role: string;
  avatar: string;
  volunteerHours: number;
  totalDonated: number;
}

export interface Needs {
  volunteers?: { current: number; goal: number };
  funds?: { current: number; goal: number };
  goods?: string[];
}

export interface Event {
  id: string;
  title: string;
  organizer: string;
  location: string;
  distance: string;
  description: string;
  urgency: 'high' | 'normal';
  image: string;
  needs: Needs;
  progress: number;
  category: string;
}

export interface Message {
  id: string;
  eventId: string;
  userId: string;
  text: string;
  timestamp: string;
}

export const currentUser: User = {
  id: 'u1',
  name: 'Sarah Jenkins',
  role: 'Community Lead',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwJvjpwYCm3jou4ZiOCnFkHwst3OgeXxfqu7wQl1brd29JEUbQjqMD6Nx1Pcz-oClevWLiH_Iio6ARJ-nM7JfYZyVI-xcwJQ0TbZ75sceGHgaBITdwmESij3ao10Wd8W4S33qtjBPXy1am_La9N6pH91cgTOHrSfApXIeyZ6b5B8tRRqyYQOB9fvfJwA1bfzAYgrrb7Ci9bjGvyLUtGMmTi71neq5DD0Jvq5v1GOH4cx_aQTTQEv2410I6VrUYjvIsChX88wjMYQkd',
  volunteerHours: 42,
  totalDonated: 1500,
};

export const mockEvents: Event[] = [
  {
    id: 'e1',
    title: 'Downtown Winter Shelter Restock',
    organizer: 'Rose City Relief',
    location: 'Portland Metro Area',
    distance: '1.2 mi away',
    description: 'Preparing for the incoming freeze. We urgently need thermal blankets, warm socks, and volunteers to help sort and distribute items this weekend before temperatures drop below freezing.',
    urgency: 'high',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHZDB862qHB0SiE-ix3mCjw7cni0f6XJl_BAQxc9SFXBVu8DcIUj1s0lbeqBu7YxwxTFIqdY6AWyrlP06Pwiuvad8FcIOMGQKj_JAc656-IemJ4Ugswh_fUiRwxqJ0Fo4bNJq3dGPIulS2vgoEqpn0uM2TTvbEm6YtFOo017swL7PIBCOuskEx-8VzDxi1cdpVILyLDfK2yAudf_cYEqIhFt5itS2mzPcqhuGX2iX6muKocfEVyTPZ-BGt7HfB01IFuesAAS_AKHJ-',
    needs: {
      volunteers: { current: 15, goal: 30 },
      goods: ['Thermal blankets', 'Warm socks', 'Jackets'],
    },
    progress: 65,
    category: 'Urgent Needs',
  },
  {
    id: 'e2',
    title: 'Weekly Pantry Distribution',
    organizer: 'PDX Food Bank',
    location: 'Portland Metro Area',
    distance: '3.5 mi',
    description: 'Assisting with traffic flow, loading boxes into cars, and registering new families for our Tuesday distribution.',
    urgency: 'normal',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzESt0V5Y8x2L5R_eA-qN3A-4bTj4q-mN2X5T1t9S5eK-2O7U0Vp0W8YtF7k2h3N_rI-t9T0E3zV7j9A6D8b9TzD-q0eE1V2sL8eL3W5vT6D-k4h9H7d5S9b2R-fJ5q2cT4b0uO9fA5o0O2fG6kK1L7xT9xN0X-8P4tC5b8Z_tZ-b5p_pQ-1jD_fA_I-g_sV_y5W3X_xX_E4zK_bH-xY_G-l_fI-A9sW_8',
    needs: {
      volunteers: { current: 5, goal: 10 },
      funds: { current: 200, goal: 500 },
    },
    progress: 40,
    category: 'Food Drive',
  },
  {
    id: 'e3',
    title: 'Park Cleanup & Planting',
    organizer: 'Neighborhood Org',
    location: 'Seattle Area',
    distance: '0.8 mi',
    description: 'Spring is here! Help us clear winter debris and plant native shrubs at Mt. Tabor. Tools provided.',
    urgency: 'normal',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8kQ3F5C_yN9R5q2F3O7O0sO_S9U7tN0I3vH_Lz9v2X-z6S_m_6uF-z5F0_o2X0U-v_2O0vG2C8F3K6gO7p3V0O_Z5U3C4U7O_gO2_M0eJ9Q_hX6mR8G8X0O9eZ5G5jO0f_X9iO-uV3P-V_8J0_C_kP0X3kK5C0v_hT9lQ_d9zM_gN7M0',
    needs: {
      volunteers: { current: 25, goal: 50 },
    },
    progress: 50,
    category: 'Volunteers',
  },
  {
    id: 'e4',
    title: 'School Supply Drive 2024',
    organizer: 'Education First',
    location: 'Eugene/Springfield',
    distance: 'Online',
    description: 'Raising funds to purchase bulk backpacks and supplies for 500 local students before the fall semester.',
    urgency: 'normal',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9dO4zL9F3C6sK_zO9Z8P-yW0W0qX9q_Z6fO9I9jK_X9L9bN-sZ7P8P9vA9oK0X0F-I-jO8s4B_h5J9N7iX0rB_iO-b5w4t_I0aF9qB-E4wT7E9L7k_X7A0fZ9tV8c_qV_l_v_F3iP4S_s_K9E6_A9tN9O3tT8B6vD',
    needs: {
      funds: { current: 3200, goal: 5000 },
    },
    progress: 64,
    category: 'Urgent Needs',
  }
];

export const mockMessages: Message[] = [
  { id: 'm1', eventId: 'e1', userId: 'u2', text: 'Does anyone have a truck? We need to move palettes.', timestamp: '10:30 AM' },
  { id: 'm2', eventId: 'e1', userId: 'u3', text: 'I can bring my F150. Be there in 20.', timestamp: '10:35 AM' },
  { id: 'm3', eventId: 'e1', userId: 'u1', text: 'Thank you! See you at the loading dock.', timestamp: '10:38 AM' },
];
