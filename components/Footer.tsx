import React from 'react'

const Footer: React.FC = () => (
  <div id="footerContainter">
    <p>©2019 Macros</p>
    <style jsx>{`
      #footerContainter {
        text-align: center;
        background-color: #25292e;
        color: white;
        width: 100%;
        padding: 1rem 0;
        bottom: 0;
      }
    `}</style>
  </div>
)

export default Footer
