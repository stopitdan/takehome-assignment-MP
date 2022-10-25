import { useState } from 'react';
import { Container } from '@mui/material';
import InputForm from './InputForm/InputForm';
import FrequencyChart from './FrequencyChart/FrequencyChart';
import UniquenessScore from './UniquenessScore/UniquenessScore';
import Loader from './Loader/Loader';

import { roundConsistent } from './utilityFunctions';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [chartType, setChartType] = useState('column');
  const [inputString, setInputString] = useState('');
  const [stringMetadata, setStringMetadata] = useState({
    uniquenessScore: 0,
    roundedUniquenessScore: null,
    frequencies: {},
  });

  const handleClick = async () => {
    setLoading(true);
    await fetch(`https://qcuialeirsxv5ht6crufymcjse0xmkop.lambda-url.us-east-1.on.aws?string=${encodeURIComponent(inputString)}`, {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => {
        // sort primarily by frequencies, secondarily alphabetically
        const sortedFrequencies = Object.fromEntries(
          Object.entries(data.frequencies).sort(([a1,a2],[b1,b2]) => b1-a1 || b2-a2)
        );
        // set new stringMetadata state value
        setStringMetadata({ ...data, roundedUniquenessScore: roundConsistent(data.uniquenessScore), frequencies: sortedFrequencies });
        setLoading(false);
      })
      .catch(error => {
        throw new Error(error.message);
      });
      setLoading(false);
  }

  const handleInputChange = (e) => {
    setInputString(e.target.value);
  }
  return (
    <div className="App">
      {loading && <Loader />}
      <Container maxWidth="lg">
        <div className="title">Input a string below to see the letter frequency and an overall uniqueness score</div>
        <InputForm
          inputString={inputString}
          handleInputChange={handleInputChange}
          handleClick={handleClick}
        />
        <UniquenessScore score={stringMetadata.roundedUniquenessScore} />
        <FrequencyChart data={stringMetadata.frequencies} chartType={chartType} setChartType={setChartType} />
      </Container>
    </div>
  );
}

export default App;
