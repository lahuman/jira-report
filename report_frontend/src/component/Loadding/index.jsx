import React from 'react';


import {
  CircularProgress,
} from '@material-ui/core';

export default () => {
  return <div style={{ position: 'fixed', zIndex: 999, top: 0, left: 0, width: '100vw', height: '100vh', justifyContent: 'center', alignItems: 'center', background: 'rgba(255,255,255,0.5)' }}>
  <CircularProgress size={90} color="secondary" style={{ position: "fixed", left: "50%", top: "50%" }} />
</div>
}