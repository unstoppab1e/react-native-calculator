/* eslint-disable no-case-declarations */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useState } from 'react';
import Button, { ButtonTypes } from './components/Button';

const Operators = {
  CLEAR: 'C',
  PLUS: '+',
  MINUS: '-',
  EQUAL: '=',
};

export default function App() {
  const [result, setResult] = useState(0);
  const [formula, setFormula] = useState([]);

  const calculate = () => {
    let calculateNumber = 0;
    let operator = '';

    formula.forEach((item) => {
      if ([Operators.PLUS, Operators.MINUS].includes(item)) {
        operator = item;
      } else {
        if (operator === Operators.PLUS) {
          calculateNumber += item;
        } else if (operator === Operators.MINUS) {
          calculateNumber -= item;
        } else {
          calculateNumber = item;
        }
      }
    });
    setResult(calculateNumber);
    setFormula([]);
  };

  const onPressOperator = (operator: string) => {
    switch (operator) {
      case Operators.CLEAR:
        setResult(0);
        setFormula([]);
        return;
      case Operators.EQUAL:
        calculate();
        return;
      default:
        const last = formula[formula.length - 1];
        if ([Operators.PLUS, Operators.MINUS].includes(last)) {
          setFormula((prev) => {
            prev.pop();
            return [...prev, operator];
          });
        } else {
          setFormula((prev) => [...prev, operator]);
        }
        return;
    }
  };

  const onPressNumber = (number) => {
    const last = formula[formula.length - 1];
    if (isNaN(last)) {
      setResult(number);
      setFormula((prev) => [...prev, number]);
    } else {
      const newNumber = (last ?? 0) * 10 + number;
      setResult(newNumber);
      setFormula((prev) => {
        prev.pop();
        return [...prev, newNumber];
      });
    }
  };

  const windowWidth = useWindowDimensions().width;
  const width = (windowWidth - 5) / 4;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.resultContainer}>
        <Text style={styles.text}>
          {result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.leftPad}>
          <View style={styles.number}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
              <Button
                key={number}
                title={number.toString()}
                onPress={() => onPressNumber(number)}
                buttonStyle={{ width, height: width, marginBottom: 1 }}
              />
            ))}
          </View>
          <View style={styles.bottom}>
            <Button
              key={0}
              title="0"
              onPress={() => onPressNumber(0)}
              buttonType={ButtonTypes.NUMBER}
              buttonStyle={{ width: width * 2, height: width, marginTop: 1 }}
            />
            <Button
              key={Operators.EQUAL}
              title="="
              onPress={() => onPressOperator(Operators.EQUAL)}
              buttonType={ButtonTypes.OPERATOR}
              buttonStyle={{ width, height: width, marginTop: 1 }}
            />
          </View>
        </View>
        <View>
          <Button
            key={Operators.CLEAR}
            title="C"
            onPress={() => onPressOperator(Operators.CLEAR)}
            buttonType={ButtonTypes.OPERATOR}
            buttonStyle={{ width, height: width, marginTop: 1 }}
          />
          <Button
            key={Operators.MINUS}
            title="-"
            onPress={() => onPressOperator(Operators.MINUS)}
            buttonType={ButtonTypes.OPERATOR}
            buttonStyle={{ width, height: width, marginTop: 1 }}
          />
          <Button
            key={Operators.PLUS}
            title="+"
            onPress={() => onPressOperator(Operators.PLUS)}
            buttonType={ButtonTypes.OPERATOR}
            buttonStyle={{ width, height: width * 2 + 1, marginTop: 1 }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  text: {
    fontSize: 60,
    fontWeight: '700',
    color: '#ffffff',
    paddingBottom: 30,
    paddingRight: 30,
  },
  resultContainer: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  buttonContainer: {
    backgroundColor: '#000000',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  leftPad: {
    width: '75%',
  },
  number: {
    flexWrap: 'wrap-reverse',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
