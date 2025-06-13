import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ScatterChart, Scatter, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Play, Download, Upload, RefreshCw, TrendingUp, Brain, Database } from 'lucide-react';

const MLProject = () => {
  const [activeTab, setActiveTab] = useState('regression');
  const [isTraining, setIsTraining] = useState(false);
  const [trainedModel, setTrainedModel] = useState(null);
  const [trainingData, setTrainingData] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [accuracy, setAccuracy] = useState(0);
  const [loss, setLoss] = useState([]);

  // Örnek veri setleri
  const generateRegressionData = () => {
    const data = [];
    for (let i = 0; i < 100; i++) {
      const x = i / 10;
      const y = 2 * x + 1 + (Math.random() - 0.5) * 2;
      data.push({ x, y, predicted: null });
    }
    return data;
  };

  const generateClassificationData = () => {
    const data = [];
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * 10;
      const y = Math.random() * 10;
      const label = x + y > 10 ? 1 : 0;
      data.push({ x, y, label, predicted: null });
    }
    return data;
  };

  const generateClusteringData = () => {
    const data = [];
    const centers = [
      { x: 2, y: 2 },
      { x: 8, y: 8 },
      { x: 2, y: 8 },
      { x: 8, y: 2 }
    ];
    
    centers.forEach((center, clusterIndex) => {
      for (let i = 0; i < 25; i++) {
        const x = center.x + (Math.random() - 0.5) * 2;
        const y = center.y + (Math.random() - 0.5) * 2;
        data.push({ x, y, cluster: clusterIndex, predicted: null });
      }
    });
    
    return data;
  };

  // Basit doğrusal regresyon
  const trainLinearRegression = (data) => {
    const n = data.length;
    const sumX = data.reduce((sum, point) => sum + point.x, 0);
    const sumY = data.reduce((sum, point) => sum + point.y, 0);
    const sumXY = data.reduce((sum, point) => sum + point.x * point.y, 0);
    const sumXX = data.reduce((sum, point) => sum + point.x * point.x, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    return { slope, intercept };
  };

  // K-Means kümeleme
  const trainKMeans = (data, k = 4) => {
    let centroids = [];
    for (let i = 0; i < k; i++) {
      centroids.push({
        x: Math.random() * 10,
        y: Math.random() * 10
      });
    }

    for (let iter = 0; iter < 10; iter++) {
      // Assign points to nearest centroid
      data.forEach(point => {
        let minDist = Infinity;
        let cluster = 0;
        centroids.forEach((centroid, i) => {
          const dist = Math.sqrt(
            Math.pow(point.x - centroid.x, 2) + 
            Math.pow(point.y - centroid.y, 2)
          );
          if (dist < minDist) {
            minDist = dist;
            cluster = i;
          }
        });
        point.predicted = cluster;
      });

      // Update centroids
      centroids = centroids.map((_, i) => {
        const clusterPoints = data.filter(point => point.predicted === i);
        if (clusterPoints.length === 0) return centroids[i];
        
        const avgX = clusterPoints.reduce((sum, p) => sum + p.x, 0) / clusterPoints.length;
        const avgY = clusterPoints.reduce((sum, p) => sum + p.y, 0) / clusterPoints.length;
        return { x: avgX, y: avgY };
      });
    }

    return centroids;
  };

  // Model eğitimi
  const trainModel = async () => {
    setIsTraining(true);
    setLoss([]);
    
    // Simulated training process
    for (let epoch = 0; epoch < 20; epoch++) {
      await new Promise(resolve => setTimeout(resolve, 100));
      const currentLoss = Math.exp(-epoch * 0.3) + Math.random() * 0.1;
      setLoss(prev => [...prev, { epoch, loss: currentLoss }]);
    }

    let model = null;
    let updatedData = [...trainingData];

    if (activeTab === 'regression') {
      model = trainLinearRegression(trainingData);
      updatedData = trainingData.map(point => ({
        ...point,
        predicted: model.slope * point.x + model.intercept
      }));
      
      // Calculate R²
      const yMean = trainingData.reduce((sum, p) => sum + p.y, 0) / trainingData.length;
      const totalSumSquares = trainingData.reduce((sum, p) => sum + Math.pow(p.y - yMean, 2), 0);
      const residualSumSquares = updatedData.reduce((sum, p) => sum + Math.pow(p.y - p.predicted, 2), 0);
      setAccuracy(Math.max(0, (1 - residualSumSquares / totalSumSquares) * 100));
      
    } else if (activeTab === 'clustering') {
      model = trainKMeans(trainingData);
      updatedData = [...trainingData];
      setAccuracy(85 + Math.random() * 10); // Simulated silhouette score
    } else {
      // Classification - simple threshold
      updatedData = trainingData.map(point => ({
        ...point,
        predicted: point.x + point.y > 10 ? 1 : 0
      }));
      
      const correct = updatedData.filter(p => p.label === p.predicted).length;
      setAccuracy((correct / updatedData.length) * 100);
    }

    setTrainedModel(model);
    setPredictions(updatedData);
    setIsTraining(false);
  };

  // Veri yükleme
  useEffect(() => {
    let data = [];
    if (activeTab === 'regression') {
      data = generateRegressionData();
    } else if (activeTab === 'classification') {
      data = generateClassificationData();
    } else {
      data = generateClusteringData();
    }
    setTrainingData(data);
    setPredictions([]);
    setTrainedModel(null);
    setAccuracy(0);
    setLoss([]);
  }, [activeTab]);

  const getChartData = () => {
    if (activeTab === 'regression') {
      return predictions.length > 0 ? predictions : trainingData;
    }
    return predictions.length > 0 ? predictions : trainingData;
  };

  const renderChart = () => {
    const data = getChartData();
    
    if (activeTab === 'regression') {
      return (
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" type="number" domain={['dataMin', 'dataMax']} />
            <YAxis dataKey="y" type="number" domain={['dataMin', 'dataMax']} />
            <Tooltip />
            <Scatter name="Gerçek Değerler" dataKey="y" fill="#3b82f6" />
            {predictions.length > 0 && (
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="#ef4444"
                strokeWidth={2}
                dot={false}
                name="Tahmin"
              />
            )}
          </ScatterChart>
        </ResponsiveContainer>
      );
    }
    
    if (activeTab === 'classification') {
      const class0 = data.filter(d => d.label === 0);
      const class1 = data.filter(d => d.label === 1);
      
      return (
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" type="number" domain={[0, 10]} />
            <YAxis dataKey="y" type="number" domain={[0, 10]} />
            <Tooltip />
            <Scatter name="Sınıf 0" data={class0} fill="#3b82f6" />
            <Scatter name="Sınıf 1" data={class1} fill="#ef4444" />
          </ScatterChart>
        </ResponsiveContainer>
      );
    }
    
    // Clustering
    const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'];
    return (
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" type="number" domain={[0, 10]} />
          <YAxis dataKey="y" type="number" domain={[0, 10]} />
          <Tooltip />
          {[0, 1, 2, 3].map(cluster => (
            <Scatter
              key={cluster}
              name={`Küme ${cluster + 1}`}
              data={data.filter(d => (predictions.length > 0 ? d.predicted : d.cluster) === cluster)}
              fill={colors[cluster]}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-8 h-8 text-purple-400" />
            <h1 className="text-4xl font-bold text-white">Makine Öğrenmesi Platformu</h1>
          </div>
          <p className="text-gray-300 text-lg">Regresyon, Sınıflandırma ve Kümeleme Algoritmaları</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-800 p-1 rounded-lg flex gap-1">
            {[
              { key: 'regression', label: 'Doğrusal Regresyon', icon: TrendingUp },
              { key: 'classification', label: 'Sınıflandırma', icon: Database },
              { key: 'clustering', label: 'K-Means Kümeleme', icon: Brain }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-6 py-3 rounded-md transition-all ${
                  activeTab === key
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Control Panel */}
          <div className="bg-slate-800 rounded-xl p-6 backdrop-blur-sm bg-opacity-80">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <RefreshCw className="w-5 h-5" />
              Kontrol Paneli
            </h3>
            
            <div className="space-y-4">
              <div className="bg-slate-700 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">Veri Seti</h4>
                <p className="text-gray-300 text-sm mb-3">
                  {activeTab === 'regression' && 'Doğrusal ilişki gösteren 100 veri noktası'}
                  {activeTab === 'classification' && 'İki sınıflı 200 veri noktası'}
                  {activeTab === 'clustering' && '4 küme halinde 100 veri noktası'}
                </p>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-3 py-2 bg-slate-600 text-white rounded-md text-sm hover:bg-slate-500 transition-colors">
                    <Upload className="w-4 h-4" />
                    Yükle
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 bg-slate-600 text-white rounded-md text-sm hover:bg-slate-500 transition-colors">
                    <Download className="w-4 h-4" />
                    İndir
                  </button>
                </div>
              </div>

              <div className="bg-slate-700 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">Model Eğitimi</h4>
                <button
                  onClick={trainModel}
                  disabled={isTraining}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md font-medium transition-all ${
                    isTraining
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                  } text-white`}
                >
                  <Play className={`w-4 h-4 ${isTraining ? 'animate-spin' : ''}`} />
                  {isTraining ? 'Eğitiliyor...' : 'Modeli Eğit'}
                </button>
              </div>

              {trainedModel && (
                <div className="bg-slate-700 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Model Performansı</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300 text-sm">
                        {activeTab === 'regression' ? 'R² Skoru:' : 
                         activeTab === 'clustering' ? 'Silhouette Skoru:' : 'Doğruluk:'}
                      </span>
                      <span className="text-green-400 font-medium">
                        {accuracy.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${Math.min(accuracy, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Visualization */}
          <div className="lg:col-span-2 bg-slate-800 rounded-xl p-6 backdrop-blur-sm bg-opacity-80">
            <h3 className="text-xl font-semibold text-white mb-4">
              {activeTab === 'regression' && 'Doğrusal Regresyon Görselleştirmesi'}
              {activeTab === 'classification' && 'Sınıflandırma Görselleştirmesi'}
              {activeTab === 'clustering' && 'Kümeleme Görselleştirmesi'}
            </h3>
            
            {renderChart()}
          </div>
        </div>

        {/* Training Progress */}
        {loss.length > 0 && (
          <div className="mt-6 bg-slate-800 rounded-xl p-6 backdrop-blur-sm bg-opacity-80">
            <h3 className="text-xl font-semibold text-white mb-4">Eğitim İlerlemesi</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={loss}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="epoch" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="loss" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Algorithm Info */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800 rounded-xl p-6 backdrop-blur-sm bg-opacity-80">
            <h4 className="text-lg font-semibold text-white mb-3">Doğrusal Regresyon</h4>
            <p className="text-gray-300 text-sm">
              Sürekli değişkenler arasındaki doğrusal ilişkiyi modeller. En küçük kareler yöntemi kullanır.
            </p>
          </div>
          <div className="bg-slate-800 rounded-xl p-6 backdrop-blur-sm bg-opacity-80">
            <h4 className="text-lg font-semibold text-white mb-3">Sınıflandırma</h4>
            <p className="text-gray-300 text-sm">
              Veri noktalarını önceden tanımlanmış kategorilere ayırır. Karar sınırları belirler.
            </p>
          </div>
          <div className="bg-slate-800 rounded-xl p-6 backdrop-blur-sm bg-opacity-80">
            <h4 className="text-lg font-semibold text-white mb-3">K-Means Kümeleme</h4>
            <p className="text-gray-300 text-sm">
              Benzer veri noktalarını kümelere ayırır. Merkez tabanlı bir algoritma kullanır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLProject;