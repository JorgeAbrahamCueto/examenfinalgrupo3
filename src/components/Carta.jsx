import React from 'react'

export const Carta = () => {
  // Datos del menú organizados por categorías
  // Datos del menú organizados por categorías
  const menu = [
    {
      header: "Entradas y Piqueos",
      gradientClass: "gradient-header-entradas",
      containerBg: "linear-gradient(120deg, #fffde4 0%, #ffd60033 100%)",
      items: [
        {
          name: "Alitas BBQ",
          img: "img/Alitas-BBQ.jpg",
          price: "S/ 18.00",
        },
        {
          name: "Salchipapas",
          img: "img/salchipapa.jpg",
          price: "S/ 12.00",
        },
        {
          name: "Chicharrón de Pollo",
          img: "img/chicharron_pollo.jpg",
          price: "S/ 20.00",
        },
      ],
    },
    {
      header: "Parrillas",
      gradientClass: "gradient-header-parrillas",
      containerBg: "linear-gradient(120deg, #fff 0%, #ffebee 100%)",
      items: [
        {
          name: "Parrilla Personal",
          img: "img/parrilla_personal.jpg",
          price: "S/ 28.00",
        },
        {
          name: "Parrilla Mixta para 2",
          img: "img/parrilla_mixta_para2.jpg",
          price: "S/ 32.00",
        },
        {
          name: "Parrilla Familiar",
          img: "img/parrilla_familiar.jpg",
          price: "S/ 75.00",
        },
      ],
    },
    {
      header: "Pollos a la Brasa",
      gradientClass: "gradient-header-pollos",
      containerBg: "linear-gradient(120deg, #fff 0%, #ffe0b2 100%)",
      items: [
        {
          name: "1 Pollo a la Brasa",
          img: "img/1pollo_a_la_brasa.jpg",
          price: "S/ 60.00",
          desc: "Incluye papas y ensalada",
        },
        {
          name: "1/2 Pollo a la Brasa",
          img: "img/medio_pollo_a_la_brasa.jpg",
          price: "S/ 32.00",
          desc: "Incluye papas y ensalada",
        },
        {
          name: "1/4 Pollo a la Brasa",
          img: "img/cuarto_pollo_a_la_brasa.jpg",
          price: "S/ 17.00",
          desc: "Incluye papas y ensalada",
        },
      ],
    },
    {
      header: "Bebidas y Tragos",
      gradientClass: "gradient-header-bebida",
      containerBg: "linear-gradient(120deg, #e3f2fd 0%, #bbdefb 100%)",
      items: [
        {
          name: "Gaseosa 1 1/2 Litro",
          img: "img/litro_y_medio.jpg",
          price: "S/ 10.00",
        },
        {
          name: "Cerveza Cristal 620ml",
          img: "img/cerveza_cristal.jpg",
          price: "S/ 10.00",
        },
        {
          name: "Pisco Sour",
          img: "img/pisco_sour.jpg",
          price: "S/ 18.00",
        },
        {
          name: "Chicha Morada Vaso",
          img: "img/chicha_morada_vaso.jpg",
          price: "S/ 4.00",
        },
        {
          name: "Agua Mineral San Mateo",
          img: "img/agua_san_mateo.jpg",
          price: "S/ 4.00",
        },
      ],
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #000 0%, #b71c1c 100%)" }}>
      <style>
        {`
          .menu-img {
            transition: transform 0.3s cubic-bezier(.4,2,.6,1);
            cursor: pointer;
          }
          .menu-img:hover {
            transform: scale(2);
            z-index: 10;
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
            position: relative;
          }
          .gradient-header-entradas {
            background: linear-gradient(90deg, #000 0%, #FFD600 100%);
            color: #fff !important;
          }
          .gradient-header-parrillas{
            background: linear-gradient(90deg, #000 0%,  #990000  100%);
            color: #fff !important;          
          }
          .gradient-header-pollos{
            background: linear-gradient(90deg, #000 0%,  #e73b00  100%);
            color: #fff !important;          
          }
          .gradient-header-bebida{
            background: linear-gradient(90deg, #000 0%,  #1919e6  100%);
            color: #fff !important;          
          }
          .menu-card-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 1.5rem;
            justify-content: flex-start;
          }
          .menu-card {
            background: #fff;
            border-radius: 1rem;
            box-shadow: 0 2px 12px rgba(0,0,0,0.10);
            width: 260px;
            padding: 1rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            transition: box-shadow 0.2s;
            position: relative;
          }
          .menu-card:hover {
            box-shadow: 0 8px 32px rgba(0,0,0,0.18);
          }
          .menu-card-title {
            font-weight: bold;
            margin-top: 0.75rem;
            margin-bottom: 0.25rem;
            text-align: center;
          }
          .menu-card-price {
            background: #43a047;
            color: #fff;
            border-radius: 999px;
            padding: 0.3rem 1rem;
            font-weight: bold;
            margin-top: 0.5rem;
            margin-bottom: 0.25rem;
            font-size: 1.1rem;
          }
          .menu-card-desc {
            font-size: 0.9rem;
            color: #888;
            text-align: center;
          }
        `}
      </style>
      <div className="container my-4">
        <h2 className="mb-4" style={{ color: "#0000", textShadow: "0 2px 8px #fff, 0 0 2px #fff" }}>Carta</h2>
        {menu.map((cat, idx) => (
          <div className="card mb-4" key={cat.header}>
            <div
              className={`card-header ${cat.gradientClass}`}
              style={{ textShadow: "0 2px 8px #fff, 0 0 2px #fff" }}
            >
              {cat.header}
            </div>
            <div className="card-body">
              <div className="menu-card-grid">
                {cat.items.map((item, i) => (
                  <div className="menu-card" key={item.name}>
                    <img
                      src={item.img}
                      alt={item.name}
                      width={150}
                      height={100}
                      className="rounded menu-img"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="menu-card-title">{item.name}</div>
                    <div className="menu-card-price">{item.price}</div>
                    {item.desc && (
                      <div className="menu-card-desc">{item.desc}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
