import React, { useState } from 'react';
import '../styles/FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqs = [
    { question: '¿Cómo puedo reservar una cancha?', answer: 'Puedes reservar una cancha desde nuestra página web en la sección de reservas.' },
    { question: '¿Cuáles son los métodos de pago aceptados?', answer: 'En la pagina no debes hacer ningun pago, A la hora de llegar a la sucursal Aceptamos pagos con tarjetas de crédito, débito y transferencias bancarias.' },
    { question: '¿Se puede Pagar a la hora de llegar a la sucursal?', answer: 'Sí, puedes cancelar tu pago cuando estes en la sucursal donde realizaste tu reserva.' },
    { question: '¿Puede Mi centro deportivo aparecer en su pagina?', answer: 'Claro que si, Mandanos un mensaje en la seccion de contactanos y te Mandaremos un mensaje.' },
  ];

  return (
    <div className="faq-container" id='faq'>
      <div className="faq-header">FAQ</div>
      <div className="faq-questions">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div
              className={`faq-question ${activeIndex === index ? 'active' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
            </div>
            {activeIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
