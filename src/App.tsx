/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MainTab, SubTab, MetricType, TimeDimension } from './types';
import Header from './components/Header';
import Tabs from './components/Tabs';
import DatePicker from './components/DatePicker';
import MetricTabs from './components/MetricTabs';
import OperatingOverviewCard from './components/OperatingOverviewCard';
import BusinessSection from './components/BusinessSection';
import KeyMetricsSection from './components/KeyMetricsSection';
import FlowSection from './components/FlowSection';
import FlowDetailView from './components/FlowDetailView';
import FlowThirdDetailView from './components/FlowThirdDetailView';
import FlowListDetailView from './components/FlowListDetailView';
import ProductSection from './components/ProductSection';
import BottomNav from './components/BottomNav';
import DetailModal from './components/DetailModal';
import SubDetailView from './components/SubDetailView';
import ThirdDetailView from './components/ThirdDetailView';
import OrgDetailView from './components/OrgDetailView';
import ProductFlowDetailView from './components/ProductFlowDetailView';
import ProductDetailView from './components/ProductDetailView';
import { Rocket } from 'lucide-react';

export default function App() {
  const [activeMain, setActiveMain] = useState<MainTab>('income');
  const [activeSub, setActiveSub] = useState<SubTab>('overview');
  const [activeMetric, setActiveMetric] = useState<MetricType>('income');
  const [selectedDate, setSelectedDate] = useState(29);
  const [timeDimension, setTimeDimension] = useState<TimeDimension>('day');
  const [view, setView] = useState<'dashboard' | 'detail' | 'sub-detail' | 'third-detail' | 'flow-detail' | 'flow-third-detail' | 'flow-list-detail' | 'org-detail' | 'product-flow-detail' | 'product-detail'>('dashboard');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedSegment, setSelectedSegment] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [flowDetailType, setFlowDetailType] = useState<'cnob' | 'osob'>('cnob');
  const [flowDetailSource, setFlowDetailSource] = useState<'segment' | 'flow'>('segment');
  const [hideFlowColumn, setHideFlowColumn] = useState(false);
  const [activeFlowListTab, setActiveFlowListTab] = useState<string>('');
  const [detailSource, setDetailSource] = useState<'overview' | 'business' | 'key-metrics'>('overview');

  const businessSegments = ['国际快递', '国际电商', '海外仓配', '本地运配', '国际运输', '国际航线', '国际大宗'];
  const productNames = ['国际标快', '国际标快+', '国际特惠', '国际大件', '医药跨境', '生鲜跨境', '电子跨境', '服装跨境', '其他'];

  const handleOpenOperatingDetail = () => {
    setDetailSource('overview');
    setView('detail');
  };

  const handleOpenBusinessDetail = () => {
    setDetailSource('business');
    setSelectedRegion('本部');
    setView('sub-detail');
  };

  const handleOpenKeyMetricsDetail = () => {
    setDetailSource('key-metrics');
    setView('org-detail');
  };

  const handleOpenProductDetail = (segment: string, metric: MetricType) => {
    setSelectedSegment(segment);
    setActiveMetric(metric);
    setView('product-detail');
  };

  const handleSelectRegion = (region: string) => {
    setSelectedRegion(region);
    setView('sub-detail');
  };

  const handleSelectSegment = (segment: string) => {
    setSelectedSegment(segment);
    setView('third-detail');
  };

  const handleSelectProductFlow = (product: string) => {
    setSelectedProduct(product);
    setView('product-flow-detail');
  };

  const handleOpenFlowDetail = (type: 'cnob' | 'osob', metric: MetricType, hideFlow?: boolean) => {
    setFlowDetailType(type);
    setActiveMetric(metric);
    setHideFlowColumn(!!hideFlow);
    setView('flow-detail');
  };

  const handleSelectFlowSegment = (segment: string, source: 'segment' | 'flow' = 'segment') => {
    setSelectedSegment(segment);
    setFlowDetailSource(source);
    if (source === 'flow') {
      setActiveFlowListTab(segment);
      setView('flow-list-detail');
    } else {
      setView('flow-third-detail');
    }
  };

  const handleSelectFlowList = (segment: string) => {
    setSelectedSegment(segment);
    setActiveFlowListTab(segment);
    setView('flow-list-detail');
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb]">
      <div className="w-full max-w-[450px] min-h-screen mx-auto bg-gradient-to-b from-[#104fb1] via-[#1c66d8] to-[#f4f7fb] relative overflow-hidden shadow-sm">
        <AnimatePresence mode="wait">
          {view === 'dashboard' ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="relative min-h-screen"
            >
              {/* Map Background Pattern */}
              <div 
                className="absolute top-0 left-0 right-0 h-[300px] opacity-10 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 0)',
                  backgroundSize: '15px 15px',
                  maskImage: 'linear-gradient(to bottom, black, transparent)'
                }}
              />

              <Header />
              
              <Tabs 
                activeMain={activeMain} 
                setActiveMain={setActiveMain}
                activeSub={activeSub}
                setActiveSub={setActiveSub}
              />

              <DatePicker 
                selectedDate={selectedDate} 
                setSelectedDate={setSelectedDate} 
                timeDimension={timeDimension}
                setTimeDimension={setTimeDimension}
              />

              <main className={`pb-24 ${activeSub === 'product' ? 'pt-0' : ''}`}>
                {activeSub === 'overview' ? (
                  <>
                    <MetricTabs 
                      activeMetric={activeMetric} 
                      setActiveMetric={setActiveMetric}
                    />
                    <OperatingOverviewCard 
                      activeMetric={activeMetric} 
                      timeDimension={timeDimension}
                      onOpenDetail={handleOpenOperatingDetail}
                    />
                    <BusinessSection 
                      activeMetric={activeMetric} 
                      timeDimension={timeDimension}
                      onOpenDetail={handleOpenBusinessDetail}
                    />
                    {activeMetric === 'income' && (
                      <KeyMetricsSection 
                        timeDimension={timeDimension}
                        onOpenDetail={handleOpenKeyMetricsDetail} 
                      />
                    )}
                  </>
                ) : activeSub === 'flow' ? (
                  <FlowSection 
                    timeDimension={timeDimension}
                    onOpenDetail={handleOpenFlowDetail} 
                  />
                ) : activeSub === 'product' ? (
                  <ProductSection 
                    timeDimension={timeDimension} 
                    onOpenDetail={handleOpenProductDetail}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-[400px] text-white/50">
                    <div className="text-sm font-bold">暂无数据</div>
                    <div className="text-[10px] opacity-60 mt-1 uppercase tracking-widest">No Data Available</div>
                  </div>
                )}
              </main>

              {/* Floating Action Button */}
              <div className="fixed right-[calc(50%-210px)] bottom-[120px] z-50">
                <button className="w-11 h-11 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg text-[#94a9cc] hover:text-[#1b63d6] transition-all hover:scale-110 active:scale-95">
                  <Rocket size={24} className="rotate-45" />
                </button>
              </div>

              <BottomNav />
            </motion.div>
          ) : view === 'detail' ? (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="relative min-h-screen bg-[#f4f7fc]"
            >
              <DetailModal 
                onClose={() => setView('dashboard')}
                activeMetric={activeMetric}
                setActiveMetric={setActiveMetric}
                onSelectRegion={handleSelectRegion}
                timeDimension={timeDimension}
                detailSource={detailSource}
              />
            </motion.div>
          ) : view === 'sub-detail' ? (
            <motion.div
              key="sub-detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="relative min-h-screen bg-[#f4f7fc]"
            >
              <SubDetailView 
                onBack={() => setView(detailSource === 'business' ? 'dashboard' : 'detail')}
                onClose={() => setView('dashboard')}
                onSelectSegment={handleSelectSegment}
                region={selectedRegion}
                activeMetric={activeMetric}
                setActiveMetric={setActiveMetric}
                timeDimension={timeDimension}
                detailSource={detailSource}
              />
            </motion.div>
          ) : view === 'flow-detail' ? (
            <motion.div
              key="flow-detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="relative min-h-screen bg-[#f4f7fc]"
            >
              <FlowDetailView 
                onBack={() => setView('dashboard')}
                onClose={() => setView('dashboard')}
                onSelectFlow={handleSelectFlowSegment}
                type={flowDetailType}
                activeMetric={activeMetric as any}
                setActiveMetric={setActiveMetric as any}
                hideFlowColumn={hideFlowColumn}
                timeDimension={timeDimension}
              />
            </motion.div>
          ) : view === 'flow-third-detail' ? (
            <motion.div
              key="flow-third-detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="relative min-h-screen bg-[#f4f7fc]"
            >
              <FlowThirdDetailView 
                onBack={() => setView('flow-detail')}
                onClose={() => setView('dashboard')}
                onSelectFlow={handleSelectFlowList}
                segment={selectedSegment}
                type={flowDetailType}
                timeDimension={timeDimension}
                activeMetric={activeMetric as any}
                setActiveMetric={setActiveMetric as any}
                showTrend={flowDetailSource === 'segment'}
                showTabs={flowDetailSource === 'segment'}
                hideFlowColumn={hideFlowColumn}
              />
            </motion.div>
          ) : view === 'flow-list-detail' ? (
            <motion.div
              key="flow-list-detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="relative min-h-screen bg-[#f4f7fc]"
            >
            <FlowListDetailView 
              onBack={() => setView(flowDetailSource === 'flow' ? 'flow-detail' : 'flow-third-detail')}
              onClose={() => setView('dashboard')}
              segment={selectedSegment}
              type={flowDetailType}
              timeDimension={timeDimension}
              tabs={flowDetailSource === 'flow' ? businessSegments : productNames}
              activeTab={activeFlowListTab}
              onTabChange={setActiveFlowListTab}
            />
            </motion.div>
          ) : view === 'org-detail' ? (
            <motion.div
              key="org-detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="relative min-h-screen bg-[#f4f7fc]"
            >
              <OrgDetailView 
                onBack={() => setView(detailSource === 'key-metrics' ? 'dashboard' : 'detail')}
                onClose={() => setView('dashboard')}
                region="本部"
                timeDimension={timeDimension}
                detailSource={detailSource}
              />
            </motion.div>
          ) : view === 'third-detail' ? (
            <motion.div
              key="third-detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="relative min-h-screen bg-[#f4f7fc]"
            >
              <ThirdDetailView 
                onBack={() => setView('sub-detail')}
                onClose={() => setView('dashboard')}
                onSelectProductFlow={handleSelectProductFlow}
                segment={selectedSegment}
                activeMetric={activeMetric}
                setActiveMetric={setActiveMetric}
                timeDimension={timeDimension}
                detailSource={detailSource}
              />
            </motion.div>
          ) : view === 'product-flow-detail' ? (
            <motion.div
              key="product-flow-detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="relative min-h-screen bg-[#f4f7fc]"
            >
              <ProductFlowDetailView 
                onBack={() => setView('product-detail')}
                onClose={() => setView('dashboard')}
                product={selectedProduct}
                activeMetric={activeMetric}
                setActiveMetric={setActiveMetric}
                timeDimension={timeDimension}
                detailSource={detailSource}
              />
            </motion.div>
          ) : view === 'product-detail' ? (
            <motion.div
              key="product-detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="relative min-h-screen bg-[#f4f7fc]"
            >
              <ProductDetailView 
                onBack={() => setView('dashboard')}
                onClose={() => setView('dashboard')}
                onSelectFlow={handleSelectProductFlow}
                segment={selectedSegment}
                activeMetric={activeMetric}
                setActiveMetric={setActiveMetric}
                timeDimension={timeDimension}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
