import React from 'react';
// CSS faylingizni bu yerda import qilishni unutmang!
import '../admindash/adminDash.css'; 

const UserDetails = ({ user, onBack }) => {
  // Agar ma'lumotlar yuklanayotgan bo'lsa
  if (!user) {
    return (
      <div className="detail-page-container">
        <div className="loading-container">Ma'lumot yuklanmoqda...</div>
      </div>
    );
  }

  // Ismdan birinchi harfni olish (Avatar uchun)
  const firstLetter = user.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <div className="detail-page-container">
      
      {/* ⬅️ Orqaga Qaytish Tugmasi */}
      <div className="details-header-action">
        <button className="back-to-dash-btn" onClick={onBack}>
          ← Ro'yxatga qaytish
        </button>
      </div>

      {/* 👤 Profil Karta */}
      <div className="master-profile-main-card">
        <div className="profile-header-flex">
          {/* Avatar doirasi */}
          <div className="profile-avatar-large">
            {firstLetter}
          </div>
          
          {/* Ism va status */}
          <div className="profile-main-info">
            <h2>{user.name || "Samandar"}</h2>
            <p className="profile-subtitle">{user.role || "Professional Usta / Hamkor"}</p>
            {/* Telefon raqam */}
            <p className="profile-subtitle" style={{ fontSize: '14px', margin: '2px 0 8px 0' }}>
              📞 {user.phone || "+998902700901"}
            </p>
            <span className="status-badge-active">FAOL</span>
          </div>
        </div>
      </div>

      {/* 📊 3 ta Vidjet Gridi (Rasmda buzilib turgan joy aynan shu yerda tuzatildi) */}
      <div className="detail-stats-grid">
        
        {/* 1-Karta: Jami Skanerlangan */}
        <div className="detail-stat-item-card">
          <div className="card-icon-wrap blue-bg">
            📦
          </div>
          <div className="card-stat-value-wrap">
            <span>Jami skanerlangan</span>
            <h3>{user.totalScanned || 0} ta mahsulot</h3>
          </div>
        </div>

        {/* 2-Karta: To'plangan Bonus */}
        <div className="detail-stat-item-card">
          <div className="card-icon-wrap gold-bg">
            🪙
          </div>
          <div className="card-stat-value-wrap">
            <span>To'plangan bonus</span>
            <h3>{user.totalBonus || 0} ball</h3>
          </div>
        </div>

        {/* 3-Karta: Xizmat Ko'rsatish Hududi */}
        <div className="detail-stat-item-card">
          <div className="card-icon-wrap green-bg">
            📍
          </div>
          <div className="card-stat-value-wrap">
            <span>Xizmat ko'rsatish hududi</span>
            <h3>{user.region || "Samarqand / Samarqand shahri"}</h3>
          </div>
        </div>

      </div>

      {/* 📜 Skanerlangan Shtrix-kodlar Tarixi Jadvali */}
      <div className="history-table-section-card">
        <div className="section-title-wrap">
          <span className="title-icon">🕒</span>
          <h3>Skanerlangan Shtrix-kodlar Tarixi</h3>
        </div>

        <div className="detail-table-wrapper">
          <table className="detail-custom-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>#</th>
                <th>Shtrix-kod (Promo)</th>
                <th>Skanerlangan vaqti</th>
              </tr>
            </thead>
            <tbody>
              {user.history && user.history.length > 0 ? (
                user.history.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="barcode-font">{item.code}</td>
                    <td>{item.scannedAt}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="empty-table-text">
                    Ushbu usta hali shtrix-kod skanerlamagan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default UserDetails;