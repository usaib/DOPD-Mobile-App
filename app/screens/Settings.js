import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ImageMapper from 'react-native-image-mapper';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import {List, Button, Menu, Divider, Modal, Portal} from 'react-native-paper';
import AppBarWrapper from '../components/AppBar';
import {ScrollView} from 'react-native-gesture-handler';
import {PaperSelect} from 'react-native-paper-select';
import {Icon} from 'react-native-elements';
import {FloatingButton} from '../components/Fab';

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
    x2: 113,
    y2: 540,
    x1: 70,
    y1: 500,
  },
  {
    id: '1',
    name: 'Right Foot',
    shape: 'rectangle',
    x2: 170,
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
    x1: 65,
    y1: 362,
  },
  {
    id: '3',
    name: 'Right Knee',
    shape: 'rectangle',
    x2: 175,
    y2: 400,
    x1: 125,
    y1: 363,
  },
  {
    id: '4',
    name: 'Stomach',
    shape: 'rectangle',
    x2: 169,
    y2: 250,
    x1: 70,
    y1: 157,
  },
  {
    id: '5',
    name: 'Left Hand',
    shape: 'rectangle',
    x2: 40,
    y2: 310,
    x1: 5,
    y1: 260,
  },
  {
    id: '6',
    name: 'Right Hand',
    shape: 'rectangle',
    x2: 235,
    y2: 310,
    x1: 200,
    y1: 260,
  },
  {
    id: '17',
    name: 'Right Eye',
    shape: 'circle',
    radius: 18,
    x2: 135,
    y2: 38,
    x1: 96,
    y1: 36,
  },
  {
    id: '26',
    name: 'Left Eye',
    shape: 'circle',
    radius: 18,
    x2: 135,
    y2: 38,
    x1: 128,
    y1: 36,
  },
  {
    id: '18',
    name: 'Mouth',
    shape: 'rectangle',
    x2: 135,
    y2: 70,
    x1: 107,
    y1: 61,
  },
  {
    id: '19',
    name: 'Nose',
    shape: 'rectangle',
    x2: 127,
    y2: 59,
    x1: 115,
    y1: 45,
  },
  {
    id: '20',
    name: 'Right Ear',
    shape: 'rectangle',
    x2: 155,
    y2: 65,
    x1: 147,
    y1: 45,
  },
  {
    id: '21',
    name: 'Left Ear',
    shape: 'rectangle',
    x2: 95,
    y2: 65,
    x1: 87,
    y1: 45,
  },
  {
    id: '8',
    name: 'Head',
    shape: 'rectangle',
    x2: 150,
    y2: 34,
    x1: 90,
    y1: 12,
  },
  {
    id: '9',
    name: 'Right Arm',
    shape: 'rectangle',
    x2: 225,
    y2: 210,
    x1: 181,
    y1: 120,
  },
  {
    id: '22',
    name: 'Right Arm',
    shape: 'circle',
    radius: 45,
    x2: 225,
    y2: 210,
    x1: 193,
    y1: 205,
  },
  {
    id: '23',
    name: 'Left Arm',
    shape: 'circle',
    radius: 45,
    x2: 225,
    y2: 210,
    x1: 6,
    y1: 205,
  },
  {
    id: '10',
    name: 'Left Arm',
    shape: 'rectangle',
    x2: 60,
    y2: 210,
    x1: 15,
    y1: 120,
  },
  {
    id: '11',
    name: 'Throat',
    shape: 'circle',
    radius: 33,
    x2: 145,
    y2: 90,
    x1: 105,
    y1: 73,
  },
  {
    id: '12',
    name: 'Chest',
    shape: 'rectangle',
    x2: 175,
    y2: 153,
    x1: 65,
    y1: 98,
  },
  {
    id: '13',
    name: 'Left Thigh',
    shape: 'rectangle',
    x2: 110,
    y2: 357,
    x1: 57,
    y1: 270,
  },
  {
    id: '14',
    name: 'Right Thigh',
    shape: 'rectangle',
    x2: 185,
    y2: 357,
    x1: 130,
    y1: 270,
  },
  {
    id: '15',
    name: 'Left Shin',
    shape: 'rectangle',
    x2: 110,
    y2: 495,
    x1: 80,
    y1: 410,
  },
  {
    id: '16',
    name: 'Right Shin',
    shape: 'rectangle',
    x2: 160,
    y2: 495,
    x1: 135,
    y1: 410,
  },
  {
    id: '24',
    name: 'Left Shin',
    shape: 'circle',
    radius: 50,
    x2: 110,
    y2: 450,
    x1: 67,
    y1: 400,
  },
  {
    id: '25',
    name: 'Right Shin',
    shape: 'circle',
    radius: 50,
    x2: 155,
    y2: 490,
    x1: 125,
    y1: 400,
  },
];
const BACK_MAP = [
  {
    id: '27',
    name: 'Left Ankle',
    shape: 'rectangle',
    x2: 113,
    y2: 540,
    x1: 70,
    y1: 500,
  },
  {
    id: '28',
    name: 'Right Ankle',
    shape: 'rectangle',
    x2: 170,
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
    x1: 65,
    y1: 362,
  },
  {
    id: '3',
    name: 'Right Knee',
    shape: 'rectangle',
    x2: 175,
    y2: 400,
    x1: 129,
    y1: 363,
  },
  {
    id: '29',
    name: 'Back',
    shape: 'rectangle',
    x2: 181,
    y2: 230,
    x1: 65,
    y1: 100,
  },
  {
    id: '5',
    name: 'Left Hand',
    shape: 'rectangle',
    x2: 40,
    y2: 310,
    x1: 5,
    y1: 260,
  },
  {
    id: '6',
    name: 'Right Hand',
    shape: 'rectangle',
    x2: 235,
    y2: 310,
    x1: 200,
    y1: 260,
  },
  {
    id: '8',
    name: 'Head',
    shape: 'rectangle',
    x2: 150,
    y2: 70,
    x1: 90,
    y1: 12,
  },
  {
    id: '9',
    name: 'Right Arm',
    shape: 'rectangle',
    x2: 225,
    y2: 210,
    x1: 181,
    y1: 120,
  },
  {
    id: '22',
    name: 'Right Arm',
    shape: 'circle',
    radius: 45,
    x2: 225,
    y2: 210,
    x1: 193,
    y1: 205,
  },
  {
    id: '23',
    name: 'Left Arm',
    shape: 'circle',
    radius: 45,
    x2: 225,
    y2: 210,
    x1: 6,
    y1: 205,
  },
  {
    id: '10',
    name: 'Left Arm',
    shape: 'rectangle',
    x2: 60,
    y2: 210,
    x1: 15,
    y1: 120,
  },
  {
    id: '11',
    name: 'Throat',
    shape: 'circle',
    radius: 34,
    x2: 145,
    y2: 90,
    x1: 105,
    y1: 73,
  },
  {
    id: '30',
    name: 'Left Hip',
    shape: 'rectangle',
    x2: 120,
    y2: 327,
    x1: 57,
    y1: 230,
  },
  {
    id: '31',
    name: 'Right Hip',
    shape: 'rectangle',
    x2: 185,
    y2: 327,
    x1: 121,
    y1: 230,
  },
  {
    id: '15',
    name: 'Left Shin',
    shape: 'rectangle',
    x2: 110,
    y2: 495,
    x1: 80,
    y1: 410,
  },
  {
    id: '16',
    name: 'Right Shin',
    shape: 'rectangle',
    x2: 160,
    y2: 495,
    x1: 135,
    y1: 410,
  },
  {
    id: '24',
    name: 'Left Shin',
    shape: 'circle',
    radius: 50,
    x2: 110,
    y2: 450,
    x1: 67,
    y1: 400,
  },
  {
    id: '25',
    name: 'Right Shin',
    shape: 'circle',
    radius: 50,
    x2: 155,
    y2: 490,
    x1: 125,
    y1: 400,
  },
];

const symptoms = {
  Head: [
    {_id: 1, value: 'mood_swings'},
    {_id: 2, value: 'restlessness'},
    {_id: 3, value: 'lethargy'},
    {_id: 4, value: 'high_fever'},
    {_id: 5, value: 'headache'},
    {_id: 6, value: 'mild_fever'},
    {_id: 7, value: 'sinus_pressure'},
  ],

  Nose: [
    {_id: 1, value: 'continuous_sneezing'},
    {_id: 2, value: 'runny_nose'},
    {_id: 3, value: 'loss_of_smell'},
    {_id: 4, value: 'red_sore_around_nose'},
    {_id: 5, value: 'congestion'},
  ],
};
const Settings = ({navigation}) => {
  const [selectedAreaId, setSelectedAreaId] = useState([]);
  const [visible, setVisible] = useState(false);
  const [bodyPart, setBodyPart] = useState('Nose');
  const [expanded, setExpanded] = useState(true);
  const [rotated, setRotated] = useState(true);
  const [selectedSymptoms, setSelectedSymptoms] = useState({
    value: '',
    list: [
      {_id: 1, value: 'continuous_sneezing'},
      {_id: 2, value: 'runny_nose'},
      {_id: 3, value: 'loss_of_smell'},
      {_id: 4, value: 'red_sore_around_nose'},
      {_id: 5, value: 'congestion'},
    ],
    selectedList: [],
    error: '',
  });
  const handlePress = () => setExpanded(!expanded);
  const toggle = () => {
    navigation?.toggleDrawer();
  };

  const showModal = bodyPart => {
    setVisible(true);
    setBodyPart(bodyPart);
  };
  const hideModal = () => setVisible(false);

  const onDelete = data => {
    setSelectedSymptoms(prev => {
      return {
        ...prev,
        selectedList: prev.selectedList.filter(item => {
          return data._id != item._id;
        }),
      };
    });
  };
  const deleteHandler = symptom => (
    <Icon name="delete" color={'#3498DB'} onPress={() => onDelete(symptom)} />
  );
  const renderModalWithSymptoms = symptoms => {
    return symptoms.map(symptom => {
      const data = symptom;
      return (
        <List.Item
          title={`${symptom.value}`}
          style={styles.listStyles}
          bottomDivider
          right={props => deleteHandler(data, data)}
        />
      );
    });
  };

  renderSelectedSymptoms = symptomsList => (
    <PaperSelect
      label="Select Symptoms"
      value={symptomsList.value}
      onSelection={value => {
        setSelectedSymptoms({
          ...selectedSymptoms,
          value: value.text,
          selectedList: value.selectedList,
          error: '',
        });
        console.log(selectedSymptoms.selectedList);
      }}
      arrayList={[...symptomsList]}
      selectedArrayList={selectedSymptoms.selectedList}
      errorText={selectedSymptoms.error}
      multiEnable={true}
      textInputMode="flat"
      searchStyle={{iconColor: 'blue'}}
    />
  );
  logOutZoomState = (event, gestureState, zoomableViewEventObject) => {};
  const onModelRotate = () => {
    setRotated(prev => !prev);
    console.log(rotated);
  };

  const mapperAreaClickHandler = async (item, idx, event) => {
    const currentSelectedAreaId = selectedAreaId;
    showModal(item.name);
    if (Array.isArray(currentSelectedAreaId)) {
      const indexInState = currentSelectedAreaId.indexOf(item.id);
      if (indexInState !== -1) {
        console.log('Removing id', item.id);
        setSelectedAreaId([
          ...currentSelectedAreaId.slice(0, indexInState),
          ...currentSelectedAreaId.slice(indexInState + 1),
        ]);
      } else {
        // alert(`Clicked Item Id: ${item.name}`);
        // console.log('Setting Id', item.id);
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
      <AppBarWrapper
        title={'Go Smart'}
        onPress={() => {
          navigation.navigate('Main');
        }}
        showButton={false}
        onMenuPress={toggle}
      />
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          style={styles.modal}
          contentContainerStyle={{backgroundColor: 'white', padding: 20}}>
          <ScrollView>
            <Text>
              Select Symptoms from here. Click outside this area to dismiss.
            </Text>
            {renderSelectedSymptoms(symptoms[bodyPart])}
            {/* {console.log(symptoms[bodyPart])} */}
            {/* ;{renderModalWithSymptoms(symptoms[bodyPart])} */}
          </ScrollView>
          <Button onPress={hideModal}>Done</Button>
        </Modal>
      </Portal>
      <View
        style={{
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          flexDirection: 'row',
          padding: 0,
          margin: 0,
        }}>
        <FloatingButton
          onRotate={onModelRotate}
          onDone={() => {
            console.log('Done with Symptoms');
          }}
        />
      </View>
      <View style={{flex: 1, alignItems: 'center', padding: 0}}>
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
            imgSource={
              rotated
                ? require('../images/Body.png')
                : require('../images/bodyBack.jpg')
            }
            imgMap={rotated ? RECTANGLE_MAP : BACK_MAP}
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
          {renderModalWithSymptoms(selectedSymptoms.selectedList)}
        </List.Accordion>
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfbfb',
    flexDirection: 'column',
  },
  modal: {
    height: '30%',
    marginTop: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listStyles: {
    backgroundColor: '#FFFFFF',
    marginLeft: 0,
    left: 0,
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
