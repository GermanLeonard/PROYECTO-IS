import React, { useState } from 'react';
import '../styles/Contacto.css';

const Contacto = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="contact-container" id='contact'>
      <div className="contact-header">Contáctanos</div>
      <div className="contact-wrapper">
        <div className="info-section">
          <div className="decoration-circle-1"></div>
          <div className="decoration-circle-2"></div>
          <div className="info-content">
            <h2>Danos un toque para más información</h2>
            <p>
              Mandanos un mensaje para mostrarte todas las ventajas que te ofrecemos y como puedes aparecer en nustra pagina,
              introduce tus datos y nos pondremos en contacto contigo.
            </p>
          </div>
        </div>

        <div className="form-section">
          <form 
            action="https://formsubmit.co/sportspotsv@gmail.com" 
            method="POST"
          >
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value="https://www.sportspotsv.com/" />

            <div className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nombre"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Correo electrónico"
                required
              />
            </div>

            <div className="form-group">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Teléfono"
              required
               pattern="[0-9]{8}"
              title="Por favor, introduce un número de telefono valido de 8 digitos"
              />
            </div>

            <div className="form-group">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Mensaje"
                rows="4"
                required
              />
            </div>

            <button type="submit">
              Enviar mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contacto;