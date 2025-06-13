# 🧠 Makine Öğrenmesi Platformu

Modern ve interaktif makine öğrenmesi algoritmaları platformu. React ve Recharts kullanılarak geliştirilmiş, üç temel ML algoritmasını görselleştiren eğitim aracı.

![Proje Screenshot](screenshot.png)

## ✨ Özellikler

### 🎯 Algoritmalar
- **Doğrusal Regresyon** - Sürekli değişkenler arası ilişki modellemesi
- **Sınıflandırma** - İki sınıflı veri noktalarını ayırma
- **K-Means Kümeleme** - Benzer verileri 4 kümeye gruplama

### 🎨 Görsel Özellikler
- **Gerçek zamanlı görselleştirme** - Canlı grafikler ve animasyonlar
- **İnteraktif eğitim süreci** - Tek tıkla model eğitimi
- **Performans metrikleri** - R², Doğruluk ve Silhouette skorları
- **Modern UI/UX** - Gradient tasarım ve smooth animasyonlar

### 📊 Veri Setleri
- Otomatik veri üretimi
- Her algoritma için özel veri setleri
- 100-200 veri noktası ile test

## 🚀 Kurulum

### Gereksinimler
- Node.js (v14 veya üzeri)
- npm veya yarn

### Adımlar

1. **Projeyi klonlayın**
```bash
git clone https://github.com/yourusername/makine-ogrenmesi-platformu.git
cd makine-ogrenmesi-platformu
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
# veya
yarn install
```

3. **Geliştirme sunucusunu başlatın**
```bash
npm start
# veya
yarn start
```

4. **Tarayıcıda açın**
```
http://localhost:3000
```

## 📁 Proje Yapısı

```
makine-ogrenmesi-platformu/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   └── MLProject.js          # Ana uygulama komponenti
│   ├── App.js                    # Ana uygulama
│   ├── App.css                   # Stil dosyası
│   └── index.js                  # Giriş noktası
├── package.json
├── README.md
└── tailwind.config.js
```

## 🛠️ Kullanılan Teknolojiler

- **React** - Frontend framework
- **Recharts** - Veri görselleştirme
- **Lucide React** - Modern ikonlar
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript ES6+** - Modern JavaScript

## 📈 Algoritma Detayları

### Doğrusal Regresyon
- **Yöntem**: En küçük kareler
- **Metrik**: R² (Determinasyon katsayısı)
- **Kullanım**: Sürekli değişken tahmini

### Sınıflandırma
- **Yöntem**: Basit threshold tabanlı
- **Metrik**: Doğruluk (Accuracy)
- **Kullanım**: İkili sınıflandırma

### K-Means Kümeleme
- **Yöntem**: Centroid tabanlı kümeleme
- **Metrik**: Silhouette skoru
- **Kullanım**: Denetimsiz öğrenme

## 🎮 Nasıl Kullanılır

1. **Algoritma Seçin**: Üst menüden istediğiniz algoritmayı seçin
2. **Veriyi İnceleyin**: Otomatik üretilen veri setini görüntüleyin
3. **Modeli Eğitin**: "Modeli Eğit" butonuna tıklayın
4. **Sonuçları Görün**: Gerçek zamanlı grafikler ve performans skorları

## 🔧 Geliştirme

### Yeni Algoritma Ekleme
```javascript
// src/components/MLProject.js içinde
const trainNewAlgorithm = (data) => {
  // Algoritma implementasyonu
  return model;
};
```

### Yeni Metrik Ekleme
```javascript
const calculateNewMetric = (predictions, actual) => {
  // Metrik hesaplama
  return score;
};
```

## 📊 Performans

- **Eğitim Süresi**: ~2 saniye (simülasyon)
- **Veri İşleme**: 100-200 nokta gerçek zamanlı
- **Responsive**: Mobil ve desktop uyumlu

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'inizi push edin (`git push origin feature/AmazingFeature`)
5. Pull Request açın

## 🐛 Bilinen Sorunlar

- [ ] Büyük veri setlerinde performans optimizasyonu
- [ ] Mobil cihazlarda grafik boyutlandırma
- [ ] Safari'de animasyon uyumluluğu

## 📋 Yapılacaklar

- [ ] Neural Network algoritması
- [ ] CSV dosya yükleme
- [ ] Model kaydetme/yükleme
- [ ] Algoritma karşılaştırma
- [ ] Daha fazla veri seti seçeneği
- [ ] Parametre ayarlama paneli

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 📞 İletişim

- **Proje Linki**: [https://github.com/yourusername/makine-ogrenmesi-platformu](https://github.com/yourusername/makine-ogrenmesi-platformu)
- **Demo**: [Live Demo](https://your-demo-link.com)

## 🙏 Teşekkürler

- [React](https://reactjs.org/) - Frontend framework
- [Recharts](https://recharts.org/) - Görselleştirme kütüphanesi
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lucide](https://lucide.dev/) - İkon kütüphanesi

---

⭐ Eğer bu proje işinize yaradıysa, yıldız vermeyi unutmayın!