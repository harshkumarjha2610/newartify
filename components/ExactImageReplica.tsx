import React from 'react';

const ExactImageReplica: React.FC = () => {
  return (
    <div 
      className="relative overflow-hidden"
      style={{
        width: '673px',
        height: '946px',
        background: 'linear-gradient(180deg, #F0CFD0 0%, #E8B4B5 50%, #C69499 100%)',
      }}
    >
      {/* Top curved panel container */}
      <div className="absolute inset-0">
        {/* Main white panel with curved bottom */}
        <svg
          className="absolute top-0 left-0"
          width="673"
          height="370"
          viewBox="0 0 673 370"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="panelGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E8E6E5" />
              <stop offset="50%" stopColor="#F0EEEB" />
              <stop offset="100%" stopColor="#E5E2D5" />
            </linearGradient>
            <filter id="panelShadow" x="-5%" y="-5%" width="110%" height="110%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000000" floodOpacity="0.15"/>
              <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#000000" floodOpacity="0.1"/>
            </filter>
          </defs>
          
          {/* Main panel shape with curved bottom */}
          <path
            d="
              M 15,0 
              L 658,0 
              Q 665,0 665,15 
              L 665,200 
              Q 665,250 640,280
              Q 600,320 550,300
              Q 500,280 450,320
              Q 400,360 336,346
              Q 273,360 223,320
              Q 173,280 123,300
              Q 73,320 33,280
              Q 8,250 8,200
              L 8,15 
              Q 8,0 15,0 
              Z
            "
            fill="url(#panelGradient)"
            filter="url(#panelShadow)"
            stroke="rgba(0,0,0,0.1)"
            strokeWidth="1"
          />
        </svg>
        
        {/* Title Text */}
        <div 
          className="absolute flex flex-col items-center justify-center"
          style={{
            top: '70px',
            left: '0px',
            right: '0px',
            width: '100%',
          }}
        >
          <h1 
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: '68px',
              fontWeight: 'bold',
              color: '#7F0043',
              textAlign: 'center',
              lineHeight: '1.15',
              margin: '0',
              padding: '0',
              letterSpacing: '-0.5px',
            }}
          >
            Financial
          </h1>
          <h1 
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: '68px',
              fontWeight: 'bold',
              color: '#7F0043',
              textAlign: 'center',
              lineHeight: '1.15',
              margin: '0',
              padding: '0',
              marginTop: '8px',
              letterSpacing: '-0.5px',
            }}
          >
            Astrology
          </h1>
        </div>
      </div>
      
      {/* Body Text Section */}
      <div 
        className="absolute flex flex-col items-center"
        style={{
          top: '400px',
          left: '40px',
          right: '40px',
          width: '593px',
        }}
      >
        <p 
          style={{
            fontFamily: '"Noto Sans Bengali", "Bangla", sans-serif',
            fontSize: '38px',
            color: '#01245B',
            textAlign: 'center',
            lineHeight: '1.6',
            margin: '0 0 25px 0',
            fontWeight: '500',
          }}
        >
          অর্থ সম্পর্কীয় যাবতীয় বিচার নিখুঁত
        </p>
        
        <p 
          style={{
            fontFamily: '"Noto Sans Bengali", "Bangla", sans-serif',
            fontSize: '38px',
            color: '#01245B',
            textAlign: 'center',
            lineHeight: '1.6',
            margin: '0 0 25px 0',
            fontWeight: '500',
          }}
        >
          ভাবে KP Paddhati ও Modern
        </p>
        
        <p 
          style={{
            fontFamily: '"Noto Sans Bengali", "Bangla", sans-serif',
            fontSize: '38px',
            color: '#01245B',
            textAlign: 'center',
            lineHeight: '1.6',
            margin: '0 0 25px 0',
            fontWeight: '500',
          }}
        >
          Astrology combination অনুযায়ী
        </p>
        
        <p 
          style={{
            fontFamily: '"Noto Sans Bengali", "Bangla", sans-serif',
            fontSize: '38px',
            color: '#01245B',
            textAlign: 'center',
            lineHeight: '1.6',
            margin: '0 0 25px 0',
            fontWeight: '500',
          }}
        >
          করা যায়। যেমন ঐতুক কোনো
        </p>
        
        <p 
          style={{
            fontFamily: '"Noto Sans Bengali", "Bangla", sans-serif',
            fontSize: '38px',
            color: '#01245B',
            textAlign: 'center',
            lineHeight: '1.6',
            margin: '0 0 25px 0',
            fontWeight: '500',
          }}
        >
          অর্থ বা সম্পত্তি পাবেন কিনা,
        </p>
        
        <p 
          style={{
            fontFamily: '"Noto Sans Bengali", "Bangla", sans-serif',
            fontSize: '38px',
            color: '#01245B',
            textAlign: 'center',
            lineHeight: '1.6',
            margin: '0 0 25px 0',
            fontWeight: '500',
          }}
        >
          নিজের নামে বাড়ি গাড়ি হবে
        </p>
        
        <p 
          style={{
            fontFamily: '"Noto Sans Bengali", "Bangla", sans-serif',
            fontSize: '38px',
            color: '#01245B',
            textAlign: 'center',
            lineHeight: '1.6',
            margin: '0 0 25px 0',
            fontWeight: '500',
          }}
        >
          কিনা, লোন ধার দেনা সম্পর্কে,
        </p>
        
        <p 
          style={{
            fontFamily: '"Noto Sans Bengali", "Bangla", sans-serif',
            fontSize: '38px',
            color: '#01245B',
            textAlign: 'center',
            lineHeight: '1.6',
            margin: '0',
            fontWeight: '500',
          }}
        >
          কবে আপনার আর্থিক উন্নতি হবে
        </p>
      </div>
    </div>
  );
};

export default ExactImageReplica;