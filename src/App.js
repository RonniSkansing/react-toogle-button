import React, { useState } from 'react';
import './App.css';
import { NewToggle } from './components/NewToggle/NewToggle';
import { ToggleButton } from './components/ToggleButton/ToggleButton'

function App() {
  const [checked, setChecked] = useState(false);
  const [isBarCodeScannerShown, setIsBarCodeScannerShown] = useState(true);

  const toggleChecked = () => {
    setChecked(!checked);
    setIsBarCodeScannerShown(checked);
  }
  return (
    <div className="App">
      {/*  <div className="button-wrapper">
        <ToggleButton
          onChange={toggleChecked}
          checked={checked}
          width={200}
          height={53}
          uncheckedIcon={false}
          checkedIcon={false}
          handleDiameter={41}
          onColor={false}
          offColor={false}
          backgroundStyle={({
            background: checked ? 'linear-gradient(90deg, #8cc63f, #22b573)' : 'linear-gradient(90deg, #f7931e, #ed3e9a)',
            boxShadow: "5px 5px 25px #272727"
          })} />
      </div> */}
      <div className="button-wrapper2">
        <NewToggle
          onChange={toggleChecked}
          checked={checked}
          width={200}
          height={53}
          uncheckedIcon={false}
          checkedIcon={false}
          handleDiameter={41}
          onColor={false}
          offColor={false}
          backgroundStyleCustom={({
            background: checked ? 'linear-gradient(90deg, #8cc63f, #22b573)' : 'linear-gradient(90deg, #f7931e, #ed3e9a)',
          })}
        />
      </div>

    </div>
  );
}

export default App;
