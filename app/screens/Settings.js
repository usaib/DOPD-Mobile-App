import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ImageMapper from 'react-native-image-mapper';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import {List, Button, Menu, Divider, Modal, Portal} from 'react-native-paper';
import AppBarWrapper from '../components/AppBar';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (var i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
  return color;
};

const RECTANGLE_MAP = [
  {
    id: '0',
    name: 'Left Foot',
    shape: 'rectangle',
    x2: 110,
    y2: 540,
    x1: 80,
    y1: 500,
  },
  {
    id: '1',
    name: 'Right Foot',
    shape: 'rectangle',
    x2: 155,
    y2: 540,
    x1: 125,
    y1: 500,
  },
  {
    id: '2',
    name: 'Left Knee',
    shape: 'rectangle',
    x2: 110,
    y2: 400,
    x1: 80,
    y1: 370,
  },
  {
    id: '3',
    name: 'Right Knee',
    shape: 'rectangle',
    x2: 155,
    y2: 400,
    x1: 125,
    y1: 370,
  },
  {
    id: '4',
    name: 'Stomach',
    shape: 'rectangle',
    x2: 155,
    y2: 240,
    x1: 80,
    y1: 165,
  },
  {
    id: '5',
    name: 'Left Hand',
    shape: 'rectangle',
    x2: 40,
    y2: 315,
    x1: 5,
    y1: 250,
  },
  {
    id: '6',
    name: 'Right Hand',
    shape: 'rectangle',
    x2: 235,
    y2: 315,
    x1: 200,
    y1: 250,
  },
  {
    id: '17',
    name: 'Eyes',
    shape: 'rectangle',
    x2: 135,
    y2: 38,
    x1: 100,
    y1: 28,
  },
  {
    id: '18',
    name: 'Mouth',
    shape: 'rectangle',
    x2: 130,
    y2: 60,
    x1: 104,
    y1: 50,
  },
  {
    id: '19',
    name: 'Nose',
    shape: 'rectangle',
    x2: 123,
    y2: 50,
    x1: 110,
    y1: 37,
  },
  {
    id: '20',
    name: 'Right Ear',
    shape: 'rectangle',
    x2: 145,
    y2: 50,
    x1: 138,
    y1: 32,
  },
  {
    id: '21',
    name: 'Left Ear',
    shape: 'rectangle',
    x2: 95,
    y2: 50,
    x1: 88,
    y1: 32,
  },
  {
    id: '8',
    name: 'Head',
    shape: 'rectangle',
    x2: 140,
    y2: 28,
    x1: 95,
    y1: 2,
  },
  {
    id: '9',
    name: 'Right Arm',
    shape: 'rectangle',
    x2: 210,
    y2: 255,
    x1: 175,
    y1: 120,
  },
  {
    id: '10',
    name: 'Left Arm',
    shape: 'rectangle',
    x2: 60,
    y2: 255,
    x1: 25,
    y1: 120,
  },
  {
    id: '11',
    name: 'Throat',
    shape: 'rectangle',
    x2: 145,
    y2: 90,
    x1: 90,
    y1: 65,
  },
  {
    id: '12',
    name: 'Chest',
    shape: 'rectangle',
    x2: 165,
    y2: 150,
    x1: 70,
    y1: 92,
  },
  {
    id: '13',
    name: 'Left Thigh',
    shape: 'rectangle',
    x2: 110,
    y2: 360,
    x1: 70,
    y1: 270,
  },
  {
    id: '14',
    name: 'Right Thigh',
    shape: 'rectangle',
    x2: 165,
    y2: 360,
    x1: 125,
    y1: 270,
  },
  {
    id: '15',
    name: 'Left Shin',
    shape: 'rectangle',
    x2: 110,
    y2: 490,
    x1: 80,
    y1: 410,
  },
  {
    id: '16',
    name: 'Right Shin',
    shape: 'rectangle',
    x2: 155,
    y2: 490,
    x1: 125,
    y1: 410,
  },
];
const Settings = ({navigation}) => {
  const [selectedAreaId, setSelectedAreaId] = useState([]);
  const [visible, setVisible] = useState(false);

  const [expanded, setExpanded] = useState(true);
  const handlePress = () => setExpanded(!expanded);
  const toggle = () => {
    navigation?.toggleDrawer();
  };
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  logOutZoomState = (event, gestureState, zoomableViewEventObject) => {};

  const mapperAreaClickHandler = async (item, idx, event) => {
    const currentSelectedAreaId = selectedAreaId;
    showModal();
    if (Array.isArray(currentSelectedAreaId)) {
      const indexInState = currentSelectedAreaId.indexOf(item.id);
      if (indexInState !== -1) {
        console.log('Removing id', item.id);
        setSelectedAreaId([
          ...currentSelectedAreaId.slice(0, indexInState),
          ...currentSelectedAreaId.slice(indexInState + 1),
        ]);
      } else {
        alert(`Clicked Item Id: ${item.name}`);
        console.log('Setting Id', item.id);
        setSelectedAreaId([...currentSelectedAreaId, item.id]);
      }
    } else {
      if (item.id === currentSelectedAreaId) {
        setSelectedAreaId(null);
      } else {
        setSelectedAreaId(item.id);
      }
    }
  };

  return (
    <View style={styles.container}>
      <AppBarWrapper onPress={false} onMenuPress={toggle} />
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{backgroundColor: 'white', padding: 20}}>
          <Text>Example Modal. Click outside this area to dismiss.</Text>
          <List.Item title="Continouse Sneezing" style={styles.listStyles} />
          <List.Item title="Sour Throat" style={styles.listStyles} />
          <List.Item title="Continouse Sneezing" style={styles.listStyles} />
          <List.Item title="Sour Throat" style={styles.listStyles} />
          <List.Item title="Continouse Sneezing" style={styles.listStyles} />
          <List.Item title="Sour Throat" style={styles.listStyles} />
          <List.Item title="Continouse Sneezing" style={styles.listStyles} />
          <List.Item title="Sour Throat" style={styles.listStyles} />
        </Modal>
      </Portal>
      <View style={{flex: 1, alignItems: 'center', padding: 30}}>
        <ReactNativeZoomableView
          maxZoom={1.5}
          minZoom={0.5}
          zoomStep={0.5}
          initialZoom={1}
          bindToBorders={true}
          onZoomAfter={this.logOutZoomState}>
          <ImageMapper
            imgHeight={551}
            imgWidth={244}
            imgSource={{
              uri: 'https://raw.githubusercontent.com/msalo3/react-native-image-mapper/master/Examples/human.png',
            }}
            imgMap={RECTANGLE_MAP}
            onPress={(item, idx, event) =>
              mapperAreaClickHandler(item, idx, event)
            }
            containerStyle={{top: 10}}
            selectedAreaId={selectedAreaId}
            multiselect
          />
        </ReactNativeZoomableView>
      </View>

      <List.Section>
        <List.Accordion
          style={styles.listAccordionStyles}
          titleStyle={{color: '#FFFFFF'}}
          descriptionStyle={{color: '#FFFFFF'}}
          title="Symptoms"
          description="list of your all selected symptoms"
          left={props => <List.Icon {...props} icon="equal" color="#FFFFFF" />}
          expanded={expanded}
          onPress={handlePress}>
          <List.Item title="Continouse Sneezing" style={styles.listStyles} />
          <List.Item title="Sour Throat" style={styles.listStyles} />
          <List.Item title="Continouse Sneezing" style={styles.listStyles} />
          <List.Item title="Sour Throat" style={styles.listStyles} />
          <List.Item title="Continouse Sneezing" style={styles.listStyles} />
          <List.Item title="Sour Throat" style={styles.listStyles} />
          <List.Item title="Continouse Sneezing" style={styles.listStyles} />
          <List.Item title="Sour Throat" style={styles.listStyles} />
        </List.Accordion>
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
  },
  listStyles: {
    backgroundColor: '#FFFFFF',
  },
  listAccordionStyles: {backgroundColor: '#3498DB', color: '#FFFFFF'},
  Text: {
    marginLeft: 10,
    color: '#3498DB',
    fontFamily: 'Gibson-Regular',
    fontSize: 20,
  },
  button: {
    fontFamily: 'Gibson-Regular',
    color: 'white',
  },
});
export default Settings;
