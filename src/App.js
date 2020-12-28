import React from 'react';
//import ReactDOM from 'react-dom';
import logo from './Basic-COVID19-Tracker-Icon-Main.svg';
import './App.css';

const { getCOVIDData } = require('./APIData/index.js');
const { formatNumber } = require('./components/index.js');

class App extends React.Component {
    state = {
        data: {
            confirmed: {
                value: 0
            },
            deaths: {
                value: 0
            },
            recoveries: {
                value: 0
            }
        }
    }
    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;
        getCOVIDData().then(data => {
            this.setState({ data });
        });
    }

    render() {
        let [rawConfirmed, rawDeaths, rawRecoveries] = ['', '', ''];
        if (this.state.data.confirmed.value && this.state.data.deaths.value && this.state.data.recovered.value) {
            rawConfirmed = this.state.data.confirmed.value;
            rawDeaths = this.state.data.deaths.value;
            rawRecoveries = this.state.data.recovered.value;
        }
        let [confirmed, deaths, recoveries] = [formatNumber(rawConfirmed), formatNumber(rawDeaths), formatNumber(rawRecoveries)];
        return (
          <div className="App">
              <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo"/>
                  <p>
                      <b>
                        Welcome to an extremely simple COVID-19 tracker
                      </b>
                  </p>
                  <a className="App-link"
                     href="https://github.com/KaNguy/Basic-COVID19-Tracker-Dashboard"
                     target="_blank"
                     rel="noopener noreferrer">GitHub Source</a>
                  <p>Global Cases: {confirmed}</p>
                  <p>Global Deaths: {deaths}</p>
                  <p>Global Recoveries: {recoveries}</p>
              </header>
          </div>
      );
  }

  componentWillUnmount() {
        this._isMounted = false;
    }
}



//ReactDOM.render(<App />, document.getElementById('root'));

export default App;
