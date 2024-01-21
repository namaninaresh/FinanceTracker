import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import {colors} from '../../styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

import React, {useState} from 'react';
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

function CardTitle({
  children,
  style = {},
  expanded,
  showBefore = true,
  navigate = null,
  beforeColor = colors.ORANGE_DARK,
}) {
  const navigation = useNavigation();
  return (
    <View style={[styles.cardTitleContainer]}>
      {showBefore && (
        <View
          style={[
            styles.cardTitleBefore,
            {backgroundColor: beforeColor},
          ]}></View>
      )}
      <Text style={[styles.cardTitle, style]}>{children}</Text>

      <TouchableOpacity
        style={{
          backgroundColor: colors.BLACK_3,
          padding: 2,
          borderRadius: 40,
        }}>
        <Icon
          name={expanded ? 'chevron-down' : 'chevron-right'}
          size={20}
          color={'white'}
        />
      </TouchableOpacity>
    </View>
  );
}
const Accordion = ({title, beforeColor, content, style, children}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={{backgroundColor: colors.BLACK_4}}>
      <TouchableWithoutFeedback onPress={toggleAccordion}>
        <View>
          {
            <CardTitle expanded={expanded} beforeColor={beforeColor}>
              {title}
            </CardTitle>
          }
        </View>
      </TouchableWithoutFeedback>
      {expanded && <View style={[styles.container, style]}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: colors.BLACK_4,
  },
  contained: {
    backgroundColor: colors.BLACK_4,
  },
  elevated: {
    backgroundColor: colors.ORANGE_DARK,
  },
  outlined: {
    borderColor: colors.BLACK_2,
    borderWidth: 1,
  },
  cardTitleContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: 'center',
    paddingVertical: 10,
  },
  cardTitleBefore: {
    width: 5,
    height: 20,
    backgroundColor: colors.ORANGE_DARK,
    position: 'absolute',
  },
  cardTitle: {
    color: 'white',
    fontSize: 16,
    flex: 1,
    fontWeight: '800',
    paddingLeft: 20,
  },
});

export default Accordion;
