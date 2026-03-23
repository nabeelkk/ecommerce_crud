import React from 'react';

function Footer() {
  return (
    <footer style={{ background: '#fafbfc', padding: '3rem 4rem', marginTop: 'auto', borderTop: '1px solid #eaeaec' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem', maxWidth: '1600px', margin: '0 auto' }}>
        <div>
          <h4 style={{ fontSize: '0.9rem', color: '#282c3f', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Online Shopping</h4>
          <ul style={{ listStyle: 'none', color: '#696e79', fontSize: '0.95rem', lineHeight: '2' }}>
            <li>Men</li>
            <li>Women</li>
            <li>Kids</li>
            <li>Home & Living</li>
          </ul>
        </div>
        <div>
          <h4 style={{ fontSize: '0.9rem', color: '#282c3f', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Useful Links</h4>
          <ul style={{ listStyle: 'none', color: '#696e79', fontSize: '0.95rem', lineHeight: '2' }}>
            <li>Blog</li>
            <li>Careers</li>
            <li>Site Map</li>
            <li>Corporate Information</li>
          </ul>
        </div>
        <div>
          <h4 style={{ fontSize: '0.9rem', color: '#282c3f', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Customer Policies</h4>
          <ul style={{ listStyle: 'none', color: '#696e79', fontSize: '0.95rem', lineHeight: '2' }}>
            <li>Contact Us</li>
            <li>FAQ</li>
            <li>T&C</li>
            <li>Terms Of Use</li>
            <li>Track Orders</li>
            <li>Shipping</li>
            <li>Cancellation</li>
            <li>Returns</li>
            <li>Privacy policy</li>
          </ul>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #eaeaec', color: '#94969f', fontSize: '0.9rem' }}>
        © {new Date().getFullYear()} www.blendfashion.com. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
