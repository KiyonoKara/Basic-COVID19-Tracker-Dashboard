import React from 'react';
import logo from './Basic-COVID19-Tracker-Icon-Main.svg';
import './App.css';

const { getCovidData } = require('./api_data/index.js');
const { formatNumber } = require('./components/index.js');

class App extends React.Component {
    state = {
        confirmed: 0,
        deaths: 0,
        recoveries: 0,
        loading: true
    }
    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;

        getCovidData()
            .then(data => {
                if (this._isMounted) {
                    this.setState({
                        confirmed: data.confirmed,
                        deaths: data.deaths,
                        recoveries: data.recoveries,
                        loading: false
                    });
                }
            })
            .catch(error => {
            console.error('Error fetching data:', error);
            if (this._isMounted) {
                this.setState({ loading: false });
            }
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        let { confirmed, deaths, recoveries, loading } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        return (
          <div className="App">
              <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo"/>
                  <p>
                      <b>
                        COVID-19 Global Stats
                      </b>
                  </p>
                  <a className="App-link"
                     href="https://github.com/KiyonoKara/Basic-COVID19-Tracker-Dashboard"
                     target="_blank"
                     rel="noopener noreferrer">GitHub Source</a>
                  <p>Cases: {formatNumber(confirmed)}</p>
                  <p>Deaths: {formatNumber(deaths)}</p>
                  <p>Recoveries: {formatNumber(recoveries)}</p>
              </header>
          </div>
      );
  }
}

export default App;
