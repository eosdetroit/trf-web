import React from "react";
import { queryMatch, airportString, manageScrollView } from './airport_utils';

const Results = ({ results, setField, selected }) => {
  const items = results.map((result, idx) => {
    const itemString =
      result.iata +
      " - " +
      result.name +
      ", " +
      result.city +
      ", " +
      result.state;
    const coords = JSON.stringify({ lat: result.lat, lng: result.lng });
    if (result === selected) {
      return (
        <li
          onMouseDown={setField}
          key={idx}
          data-coords={coords}
          data-name={result.name}
          className="selected"
        >
          {itemString}
        </li>
      );
    } else {
      return (
        <li
          onMouseDown={setField}
          key={idx}
          data-coords={coords}
          data-name={result.name}
        >
          {itemString}
        </li>
      );
    }
  });

  return <ul>{items}</ul>;
};

export class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      suggestion: "",
      results: [],
      selected: null
    };
  }

  componentDidUpdate() {
    manageScrollView();
  }

  static positions() {
    return {
      NONE: 0,
      ONLY: 1,
      FIRST: 2,
      LAST: 3,
      MID: 4
    };
  }

  highlightedPosition(index) {
    if (index === -1) {
      return 0;
    } else if (
      !this.state.results[index + 1] &&
      !this.state.results[index - 1]
    ) {
      return 1;
    } else if (!this.state.results[index - 1]) {
      return 2;
    } else if (!this.state.results[index + 1]) {
      return 3;
    } else {
      return 4;
    }
  }

  updateResults(e) {
    this.setState({
      value: e.target.value,
      suggestion: e.target.value,
      results: queryMatch(e.target.value),
      selected: null
    });
    if (!this.state.results[0]) {
      this.props.clearPoint();
    }
  }

  handleDown(index) {
    const { results } = this.state;
    switch (this.highlightedPosition(index)) {
      case Autocomplete.positions().NONE:
        this.setState({
          suggestion: airportString(results[0]),
          selected: results[0]
        });
        break;
      case Autocomplete.positions().FIRST:
      case Autocomplete.positions().MID:
        this.setState({
          suggestion: airportString(results[index + 1]),
          selected: results[index + 1]
        });
        break;
      case Autocomplete.positions().ONLY:
      case Autocomplete.positions().LAST:
        return;
    }
  }

  handleUp(index) {
    const { results, selected } = this.state;
    if (!selected) return;

    switch (this.highlightedPosition(index)) {
      case Autocomplete.positions().FIRST:
      case Autocomplete.positions().ONLY:
        this.setState({
          suggestion: this.state.value,
          selected: null
        });
        break;
      default:
        this.setState({
          suggestion: airportString(results[index - 1]),
          selected: results[index - 1]
        });
    }
  }

  handleEnter() {
    const { selected } = this.state;
    if (!selected) {
      const first = this.state.results[0];
      if (first) {
        this.confirm(first);
      } else {
        return;
      }
    } else {
      this.confirm(selected);
    }
  }

  confirm(airport) {
    this.setState({
      value: airportString(airport),
      suggestion: airportString(airport),
      results: [],
      airport: null
    });
    const data = JSON.stringify({
      lat: airport.lat,
      lng: airport.lng,
      name: airport.name
    });
    this.props.setPoint(data);
  }

  updateSuggestion(e) {
    const key = e.keyCode;
    const { results, selected } = this.state;
    const index = results.indexOf(selected);
    if (![13, 38, 40].includes(key)) return;

    if (!results[0]) return;

    switch (key) {
      case 38:
        e.preventDefault();
        this.handleUp(index);
        break;
      case 40:
        e.preventDefault();
        this.handleDown(index);
        break;
      case 13:
        this.handleEnter();
        break;
    }
  }

  setField(e) {
    const item = e.currentTarget;
    const coords = JSON.parse(item.dataset.coords);

    this.setState({
      value: item.innerHTML,
      suggestion: item.innerHTML,
      results: []
    });
    this.props.setPoint({
      lat: coords.lat,
      lng: coords.lng,
      name: item.dataset.name
    });
  }

  clearResults(e) {
    this.setState({ results: [] });
  }

  render() {
    return (
      <div className="autocomplete">
        <input
        type="text"
          ref={input => {
            this.input = input;
          }}
          onBlur={this.clearResults.bind(this)}
          onChange={this.updateResults.bind(this)}
          value={this.state.suggestion}
          onKeyDown={this.updateSuggestion.bind(this)}
        />
        {this.state.results[0] && (
          <Results
            setField={this.setField.bind(this)}
            results={this.state.results}
            selected={this.state.selected}
          />
        )}
      </div>
    );
  }
}
