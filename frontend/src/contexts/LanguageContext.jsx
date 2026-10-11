import React, { createContext, useContext, useState, useCallback } from 'react';

const translations = {
  English: {
    dashboard: 'Dashboard', aiChat: 'AI Chat', cropRecommend: 'Crop Recommend',
    diseaseDetect: 'Disease Detect', weatherForecast: 'Weather Forecast',
    marketPrices: 'Market Prices', govSchemes: 'Gov Schemes', profile: 'Profile',
    settings: 'Settings', adminPanel: 'Admin Panel', newDiscussion: 'New Discussion',
    search: 'Search features, schemes, or reports...', farmLocation: 'Farm Location',
    detecting: 'Detecting...', detectGPS: 'Detect GPS',
    voiceStart: 'Tap mic to begin speaking...', voiceComplete: 'Recording complete',
    submitSpeech: 'Submit Speech', cancel: 'Cancel',
    captureDiagnose: 'Capture & Diagnose',
    sendPlaceholder: "Ask AgriGenius: 'Recommend fertilizer dosage' or upload crop leaf disease photo...",
    notifications: 'Farm Notifications', logout: 'Logout',
    systemSettings: 'System Settings', profileDetails: 'Profile Details',
    chatRooms: 'Chat Rooms', recentChats: 'Recent Chats', pinnedChats: 'Pinned Chats',
    editLocation: 'Edit location', saveLocation: 'Save Location',
    enterCity: 'Enter city/district...', agriTitle: 'AgriGenius Intelligence',
  },
  'Español': {
    dashboard: 'Tablero', aiChat: 'Chat IA', cropRecommend: 'Recomendación de Cultivo',
    diseaseDetect: 'Detectar Enfermedad', weatherForecast: 'Pronóstico del Tiempo',
    marketPrices: 'Precios del Mercado', govSchemes: 'Esquemas Gob.', profile: 'Perfil',
    settings: 'Configuración', adminPanel: 'Panel de Admin', newDiscussion: 'Nueva Discusión',
    search: 'Buscar funciones, esquemas o informes...', farmLocation: 'Ubicación de Granja',
    detecting: 'Detectando...', detectGPS: 'Detectar GPS',
    voiceStart: 'Toque el micrófono para comenzar...', voiceComplete: 'Grabación completa',
    submitSpeech: 'Enviar Voz', cancel: 'Cancelar',
    captureDiagnose: 'Capturar y Diagnosticar',
    sendPlaceholder: "Pregunta a AgriGenius: 'Recomendar dosis de fertilizante'...",
    notifications: 'Notificaciones de Granja', logout: 'Cerrar Sesión',
    systemSettings: 'Configuración del Sistema', profileDetails: 'Detalles del Perfil',
    chatRooms: 'Salas de Chat', recentChats: 'Chats Recientes', pinnedChats: 'Chats Fijados',
    editLocation: 'Editar ubicación', saveLocation: 'Guardar ubicación',
    enterCity: 'Ingrese ciudad/distrito...', agriTitle: 'AgriGenius Inteligencia',
  },
  '\u0939\u093f\u0928\u094d\u0926\u0940': {
    dashboard: '\u0921\u0948\u0936\u092c\u094b\u0930\u094d\u0921', aiChat: 'AI \u091a\u0948\u091f', cropRecommend: '\u092b\u0938\u0932 \u0938\u0941\u091d\u093e\u0935',
    diseaseDetect: '\u0930\u094b\u0917 \u092a\u0939\u091a\u093e\u0928', weatherForecast: '\u092e\u094c\u0938\u092e \u092a\u0942\u0930\u094d\u0935\u093e\u0928\u0941\u092e\u093e\u0928',
    marketPrices: '\u092c\u093e\u091c\u093e\u0930 \u092d\u093e\u0935', govSchemes: '\u0938\u0930\u0915\u093e\u0930\u0940 \u092f\u094b\u091c\u0928\u093e\u090f\u0902', profile: '\u092a\u094d\u0930\u094b\u092b\u093e\u0907\u0932',
    settings: '\u0938\u0947\u091f\u093f\u0902\u0917\u094d\u0938', adminPanel: '\u090f\u0921\u092e\u093f\u0928 \u092a\u0948\u0928\u0932', newDiscussion: '\u0928\u0908 \u091a\u0930\u094d\u091a\u093e',
    search: '\u0938\u0941\u0935\u093f\u0927\u093e\u090f\u0902, \u092f\u094b\u091c\u0928\u093e\u090f\u0902 \u092f\u093e \u0930\u093f\u092a\u094b\u0930\u094d\u091f \u0916\u094b\u091c\u0947\u0902...', farmLocation: '\u0916\u0947\u0924 \u0938\u094d\u0925\u093e\u0928',
    detecting: '\u092a\u0924\u093e \u0932\u0917\u093e \u0930\u0939\u0947 \u0939\u0948\u0902...', detectGPS: 'GPS \u092a\u0924\u093e \u0932\u0917\u093e\u090f\u0902',
    voiceStart: '\u092c\u094b\u0932\u0928\u0947 \u0915\u0947 \u0932\u093f\u090f \u092e\u093e\u0907\u0915 \u091f\u0948\u092a \u0915\u0930\u0947\u0902...', voiceComplete: '\u0930\u093f\u0915\u0949\u0930\u094d\u0921\u093f\u0902\u0917 \u092a\u0942\u0930\u094d\u0923',
    submitSpeech: '\u0906\u0935\u093e\u091c\u093c \u092d\u0947\u091c\u0947\u0902', cancel: '\u0930\u0926\u094d\u0926 \u0915\u0930\u0947\u0902',
    captureDiagnose: '\u0915\u0948\u092a\u094d\u091a\u0930 \u0914\u0930 \u0928\u093f\u0926\u093e\u0928',
    sendPlaceholder: "AgriGenius \u0938\u0947 \u092a\u0942\u091b\u0947\u0902: '\u0909\u0930\u094d\u0935\u0930\u0915 \u0916\u0941\u0930\u093e\u0915 \u0938\u0941\u091d\u093e\u090f\u0902'...",
    notifications: '\u0916\u0947\u0924 \u0938\u0942\u091a\u0928\u093e\u090f\u0902', logout: '\u0932\u0949\u0917 \u0906\u0909\u091f',
    systemSettings: '\u0938\u093f\u0938\u094d\u091f\u092e \u0938\u0947\u091f\u093f\u0902\u0917\u094d\u0938', profileDetails: '\u092a\u094d\u0930\u094b\u092b\u093e\u0907\u0932 \u0935\u093f\u0935\u0930\u0923',
    chatRooms: '\u091a\u0948\u091f \u0930\u0942\u092e', recentChats: '\u0939\u093e\u0932 \u0915\u0940 \u091a\u0948\u091f', pinnedChats: '\u092a\u093f\u0928 \u0915\u093f\u090f \u0917\u090f \u091a\u0948\u091f',
    editLocation: '\u0938\u094d\u0925\u093e\u0928 \u0938\u0902\u092a\u093e\u0926\u093f\u0924 \u0915\u0930\u0947\u0902', saveLocation: '\u0938\u094d\u0925\u093e\u0928 \u0938\u0939\u0947\u091c\u0947\u0902',
    enterCity: '\u0936\u0939\u0930/\u091c\u093f\u0932\u093e \u0926\u0930\u094d\u091c \u0915\u0930\u0947\u0902...', agriTitle: 'AgriGenius \u0905\u0928\u0941\u0936\u0902\u0938\u093e',
  },
  '\u0c24\u0c46\u0c32\u0c41\u0c17\u0c41': {
    dashboard: '\u0c21\u0c3e\u0c37\u0c4d\u200c\u0c2c\u0c4b\u0c30\u0c4d\u0c21\u0c4d', aiChat: 'AI \u0c1a\u0c3e\u0c1f\u0c4d', cropRecommend: '\u0c2a\u0c02\u0c1f \u0c38\u0c3f\u0c2b\u0c3e\u0c30\u0c38\u0c41',
    diseaseDetect: '\u0c35\u0c4d\u0c2f\u0c3e\u0c27\u0c3f \u0c17\u0c41\u0c30\u0c4d\u0c24\u0c3f\u0c02\u0c2a\u0c41', weatherForecast: '\u0c35\u0c3e\u0c24\u0c3e\u0c35\u0c30\u0c23 \u0c05\u0c02\u0c1a\u0c28\u0c3e',
    marketPrices: '\u0c2e\u0c3e\u0c30\u0c4d\u0c15\u0c46\u0c1f\u0c4d \u0c27\u0c30\u0c32\u0c41', govSchemes: '\u0c2a\u0c4d\u0c30\u0c2d\u0c41\u0c24\u0c4d\u0c35 \u0c2a\u0c25\u0c15\u0c3e\u0c32\u0c41', profile: '\u0c2a\u0c4d\u0c30\u0c4a\u0c2b\u0c48\u0c32\u0c4d',
    settings: '\u0c38\u0c46\u0c1f\u0c4d\u0c1f\u0c3f\u0c02\u0c17\u0c4d\u200c\u0c32\u0c41', adminPanel: '\u0c05\u0c21\u0c4d\u0c2e\u0c3f\u0c28\u0c4d \u0c2a\u0c4d\u0c2f\u0c3e\u0c28\u0c46\u0c32\u0c4d', newDiscussion: '\u0c15\u0c4a\u0c24\u0c4d\u0c24 \u0c1a\u0c30\u0c4d\u0c1a',
    search: '\u0c2b\u0c40\u0c1a\u0c30\u0c4d\u0c32\u0c41, \u0c2a\u0c25\u0c15\u0c3e\u0c32\u0c41 \u0c32\u0c47\u0c26\u0c3e \u0c28\u0c3f\u0c35\u0c47\u0c26\u0c3f\u0c15\u0c32\u0c41 \u0c36\u0c4b\u0c27\u0c3f\u0c02\u0c1a\u0c02\u0c21\u0c3f...', farmLocation: '\u0c35\u0c4d\u0c2f\u0c35\u0c38\u0c3e\u0c2f \u0c38\u0c4d\u0c25\u0c3e\u0c28\u0c02',
    detecting: '\u0c17\u0c41\u0c30\u0c4d\u0c24\u0c3f\u0c38\u0c4d\u0c24\u0c41\u0c28\u0c4d\u0c28\u0c3e\u0c30\u0c41...', detectGPS: 'GPS \u0c17\u0c41\u0c30\u0c4d\u0c24\u0c3f\u0c02\u0c1a\u0c02\u0c21\u0c3f',
    voiceStart: '\u0c2e\u0c3e\u0c1f\u0c4d\u0c32\u0c3e\u0c21\u0c1f\u0c02 \u0c2a\u0c4d\u0c30\u0c3e\u0c30\u0c02\u0c2d\u0c3f\u0c02\u0c1a\u0c21\u0c3e\u0c28\u0c3f\u0c15\u0c3f \u0c2e\u0c48\u0c15\u0c4d \u0c28\u0c4a\u0c15\u0c4d\u0c15\u0c02\u0c21\u0c3f...', voiceComplete: '\u0c30\u0c3f\u0c15\u0c3e\u0c30\u0c4d\u0c21\u0c3f\u0c02\u0c17\u0c4d \u0c2a\u0c42\u0c30\u0c4d\u0c24\u0c2f\u0c3f\u0c02\u0c26\u0c3f',
    submitSpeech: '\u0c35\u0c3e\u0c2f\u0c3f\u0c38\u0c4d \u0c38\u0c2e\u0c30\u0c4d\u0c2a\u0c3f\u0c02\u0c1a\u0c02\u0c21\u0c3f', cancel: '\u0c30\u0c26\u0c4d\u0c26\u0c41 \u0c1a\u0c47\u0c2f\u0c02\u0c21\u0c3f',
    captureDiagnose: '\u0c15\u0c4d\u0c2f\u0c3e\u0c2a\u0c4d\u0c1a\u0c30\u0c4d & \u0c28\u0c3f\u0c26\u0c3e\u0c28\u0c3f\u0c02\u0c1a\u0c41',
    sendPlaceholder: "AgriGenius \u0c28\u0c3f \u0c05\u0c21\u0c17\u0c02\u0c21\u0c3f: '\u0c0e\u0c30\u0c41\u0c35\u0c41\u0c32 \u0c2e\u0c4b\u0c24\u0c3e\u0c26\u0c41 \u0c38\u0c3f\u0c2b\u0c3e\u0c30\u0c38\u0c41'...",
    notifications: '\u0c35\u0c4d\u0c2f\u0c35\u0c38\u0c3e\u0c2f \u0c28\u0c4b\u0c1f\u0c3f\u0c2b\u0c3f\u0c15\u0c47\u0c37\u0c28\u0c4d\u0c32\u0c41', logout: '\u0c32\u0c3e\u0c17\u0c4d \u0c05\u0c35\u0c41\u0c1f\u0c4d',
    systemSettings: '\u0c38\u0c3f\u0c38\u0c4d\u0c1f\u0c02 \u0c38\u0c46\u0c1f\u0c4d\u0c1f\u0c3f\u0c02\u0c17\u0c4d\u200c\u0c32\u0c41', profileDetails: '\u0c2a\u0c4d\u0c30\u0c4a\u0c2b\u0c48\u0c32\u0c4d \u0c35\u0c3f\u0c35\u0c30\u0c3e\u0c32\u0c41',
    chatRooms: '\u0c1a\u0c3e\u0c1f\u0c4d \u0c17\u0c26\u0c41\u0c32\u0c41', recentChats: '\u0c07\u0c1f\u0c40\u0c35\u0c32\u0c3f \u0c1a\u0c3e\u0c1f\u0c4d\u0c32\u0c41', pinnedChats: '\u0c2a\u0c3f\u0c28\u0c4d \u0c1a\u0c47\u0c38\u0c3f\u0c28 \u0c1a\u0c3e\u0c1f\u0c4d\u0c32\u0c41',
    editLocation: '\u0c38\u0c4d\u0c25\u0c3e\u0c28\u0c3e\u0c28\u0c4d\u0c28\u0c3f \u0c38\u0c02\u0c2a\u0c3e\u0c26\u0c3f\u0c02\u0c1a\u0c02\u0c21\u0c3f', saveLocation: '\u0c38\u0c4d\u0c25\u0c3e\u0c28\u0c3e\u0c28\u0c4d\u0c28\u0c3f \u0c38\u0c47\u0c35\u0c4d \u0c1a\u0c47\u0c2f\u0c02\u0c21\u0c3f',
    enterCity: '\u0c2a\u0c1f\u0c4d\u0c1f\u0c23\u0c02/\u0c1c\u0c3f\u0c32\u0c4d\u0c32\u0c3e \u0c28\u0c2e\u0c4b\u0c26\u0c41 \u0c1a\u0c47\u0c2f\u0c02\u0c21\u0c3f...', agriTitle: 'AgriGenius \u0c38\u0c47\u0c35\u0c32\u0c41',
  },
};

const SUPPORTED_LANGS = ['English', 'Español', '\u0939\u093f\u0928\u094d\u0926\u0940', '\u0c24\u0c46\u0c32\u0c41\u0c17\u0c41'];

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    const saved = localStorage.getItem('app_language');
    return SUPPORTED_LANGS.includes(saved) ? saved : 'English';
  });

  const setLang = useCallback((newLang) => {
    if (!SUPPORTED_LANGS.includes(newLang)) return;
    setLangState(newLang);
    localStorage.setItem('app_language', newLang);
  }, []);

  const t = useCallback(
    (key) => translations[lang]?.[key] ?? translations['English'][key] ?? key,
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, supportedLangs: SUPPORTED_LANGS }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
