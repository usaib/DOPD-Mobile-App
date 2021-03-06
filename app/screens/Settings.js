import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ImageMapper from 'react-native-image-mapper';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import {List, Button, Menu, Divider, Modal, Portal} from 'react-native-paper';
import AppBarWrapper from '../components/AppBar';
import {ScrollView} from 'react-native-gesture-handler';
import {PaperSelect} from 'react-native-paper-select';
import {Icon} from 'react-native-elements';
import {FloatingButton} from '../components/Fab';
import * as Animatable from 'react-native-animatable';
import Guidlines from '../components/Guidlines';
const MyGuidlines = Animatable.createAnimatableComponent(Guidlines);

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (var i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
  return color;
};

const RECTANGLE_MAP = [
  {
    id: '0',
    name: 'Left_Foot',
    shape: 'rectangle',
    x2: 113,
    y2: 540,
    x1: 70,
    y1: 500,
  },
  {
    id: '1',
    name: 'Right_Foot',
    shape: 'rectangle',
    x2: 170,
    y2: 540,
    x1: 125,
    y1: 500,
  },
  {
    id: '2',
    name: 'Left_Knee',
    shape: 'rectangle',
    x2: 110,
    y2: 400,
    x1: 65,
    y1: 362,
  },
  {
    id: '3',
    name: 'Right_Knee',
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
    name: 'Left_Hand',
    shape: 'rectangle',
    x2: 40,
    y2: 310,
    x1: 5,
    y1: 260,
  },
  {
    id: '6',
    name: 'Right_Hand',
    shape: 'rectangle',
    x2: 235,
    y2: 310,
    x1: 200,
    y1: 260,
  },
  {
    id: '17',
    name: 'Right_Eye',
    shape: 'circle',
    radius: 18,
    x2: 135,
    y2: 38,
    x1: 96,
    y1: 36,
  },
  {
    id: '26',
    name: 'Left_Eye',
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
    name: 'Right_Ear',
    shape: 'rectangle',
    x2: 155,
    y2: 65,
    x1: 147,
    y1: 45,
  },
  {
    id: '21',
    name: 'Left_Ear',
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
    name: 'Right_Arm',
    shape: 'rectangle',
    x2: 225,
    y2: 210,
    x1: 181,
    y1: 120,
  },
  {
    id: '22',
    name: 'Right_Arm',
    shape: 'circle',
    radius: 45,
    x2: 225,
    y2: 210,
    x1: 193,
    y1: 205,
  },
  {
    id: '23',
    name: 'Left_Arm',
    shape: 'circle',
    radius: 45,
    x2: 225,
    y2: 210,
    x1: 6,
    y1: 205,
  },
  {
    id: '10',
    name: 'Left_Arm',
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
    name: 'Left_Thigh',
    shape: 'rectangle',
    x2: 110,
    y2: 357,
    x1: 57,
    y1: 270,
  },
  {
    id: '14',
    name: 'Right_Thigh',
    shape: 'rectangle',
    x2: 185,
    y2: 357,
    x1: 130,
    y1: 270,
  },
  {
    id: '15',
    name: 'Left_Shin',
    shape: 'rectangle',
    x2: 110,
    y2: 495,
    x1: 80,
    y1: 410,
  },
  {
    id: '16',
    name: 'Right_Shin',
    shape: 'rectangle',
    x2: 160,
    y2: 495,
    x1: 135,
    y1: 410,
  },
  {
    id: '24',
    name: 'Left_Shin',
    shape: 'circle',
    radius: 50,
    x2: 110,
    y2: 450,
    x1: 67,
    y1: 400,
  },
  {
    id: '25',
    name: 'Right_Shin',
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
    name: 'Left_Ankle',
    shape: 'rectangle',
    x2: 113,
    y2: 540,
    x1: 70,
    y1: 500,
  },
  {
    id: '28',
    name: 'Right_Ankle',
    shape: 'rectangle',
    x2: 170,
    y2: 540,
    x1: 125,
    y1: 500,
  },
  {
    id: '2',
    name: 'Left_Knee',
    shape: 'rectangle',
    x2: 110,
    y2: 400,
    x1: 65,
    y1: 362,
  },
  {
    id: '3',
    name: 'Right_Knee',
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
    name: 'Left_Hand',
    shape: 'rectangle',
    x2: 40,
    y2: 310,
    x1: 5,
    y1: 260,
  },
  {
    id: '6',
    name: 'Right_Hand',
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
    name: 'Right_Arm',
    shape: 'rectangle',
    x2: 225,
    y2: 210,
    x1: 181,
    y1: 120,
  },
  {
    id: '22',
    name: 'Right_Arm',
    shape: 'circle',
    radius: 45,
    x2: 225,
    y2: 210,
    x1: 193,
    y1: 205,
  },
  {
    id: '23',
    name: 'Left_Arm',
    shape: 'circle',
    radius: 45,
    x2: 225,
    y2: 210,
    x1: 6,
    y1: 205,
  },
  {
    id: '10',
    name: 'Left_Arm',
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
    name: 'Left_Hip',
    shape: 'rectangle',
    x2: 120,
    y2: 327,
    x1: 57,
    y1: 230,
  },
  {
    id: '31',
    name: 'Right_Hip',
    shape: 'rectangle',
    x2: 185,
    y2: 327,
    x1: 121,
    y1: 230,
  },
  {
    id: '15',
    name: 'Left_Shin',
    shape: 'rectangle',
    x2: 110,
    y2: 495,
    x1: 80,
    y1: 410,
  },
  {
    id: '16',
    name: 'Right_Shin',
    shape: 'rectangle',
    x2: 160,
    y2: 495,
    x1: 135,
    y1: 410,
  },
  {
    id: '24',
    name: 'Left_Shin',
    shape: 'circle',
    radius: 50,
    x2: 110,
    y2: 450,
    x1: 67,
    y1: 400,
  },
  {
    id: '25',
    name: 'Right_Shin',
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
    {_id: 1, slug: 'mood_swings', value: 'Mood Swings'},
    {_id: 2, slug: 'restlessness', value: 'Restlessness'},
    {_id: 3, slug: 'lethargy', value: 'Lethargy'},
    {_id: 4, slug: 'high_fever', value: 'High Fever'},
    {_id: 5, slug: 'headache', value: 'Headache'},
    {_id: 6, slug: 'mild_fever', value: 'Mild Fever'},
    {_id: 7, slug: 'sinus_pressure', value: 'Sinus Pressure'},
    {_id: 8, slug: 'dizziness', value: 'Dizziness'},
    {_id: 9, slug: 'depression', value: 'Depression'},
    {_id: 10, slug: 'lack_of_concentration', value: 'Lack Of Concentration'},
    {_id: 11, slug: 'coma', value: 'Coma'},
    {_id: 12, slug: 'altered_sensorium', value: 'Altered Sensorium'},
  ],

  Nose: [
    {_id: 13, slug: 'continuous_sneezing', value: 'Continuos Sneezing'},
    {_id: 14, slug: 'runny_nose', value: 'Runny Nose'},
    {_id: 15, slug: 'loss_of_smell', value: 'Loss Of Smell'},
    {_id: 16, slug: 'red_sore_around_nose', value: 'Red Sore Around Nose'},
    {_id: 17, slug: 'congestion', value: 'Congestion'},
  ],
  Left_Eye: [
    {_id: 18, slug: 'sunken_eyes', value: 'Sunken Eyes'},
    {_id: 19, slug: 'pain_behind_the_eyes', value: 'Pain Behind The Eyes'},
    {_id: 20, slug: 'yellowing_of_eyes', value: 'Yellowing Of Eyes'},
    {
      _id: 21,
      slug: 'blurred_and_distorted_vision',
      value: 'Blurred And Distorted Vision',
    },
    {_id: 22, slug: 'redness_of_eyes', value: 'Redness Of Eyes'},
    {_id: 23, slug: 'puffy_face_and_eyes', value: 'Puffy Face And Eyes'},
    {_id: 24, slug: 'visual_disturbances', value: 'Visual Disturbances'},
    {_id: 25, slug: 'watering_from_eyes', value: 'Watering From Eyes'},
  ],
  Right_Eye: [
    {_id: 26, slug: 'sunken_eyes', value: 'Sunken Eyes'},
    {_id: 27, slug: 'pain_behind_the_eyes', value: 'Pain Behind The Eyes'},
    {_id: 28, slug: 'yellowing_of_eyes', value: 'Yellowing Of Eyes'},
    {
      _id: 29,
      slug: 'blurred_and_distorted_vision',
      value: 'Blurred And Distorted Vision',
    },
    {_id: 30, slug: 'redness_of_eyes', value: 'Redness Of Eyes'},
    {_id: 31, slug: 'puffy_face_and_eyes', value: 'Puffy Face And Eyes'},
    {_id: 32, slug: 'visual_disturbances', value: 'Visual Disturbances'},
    {_id: 33, slug: 'watering_from_eyes', value: 'Watering From Eyes'},
  ],

  Skin: [
    {_id: 34, slug: 'itching', value: 'Itching'},
    {_id: 35, slug: 'nodal_skin_eruptions', value: 'Nodal Skin Eruptions'},
    {_id: 36, slug: 'chills', value: 'Chills'},
    {_id: 37, slug: 'sweating', value: 'Sweating'},
    {_id: 38, slug: 'dehydration', value: 'Dehydration'},
    {_id: 39, slug: 'yellowish_skin', value: 'Yellowish Skin'},
    {_id: 40, slug: 'internal_itching', value: 'Internal Itching'},
    {_id: 41, slug: 'pus_filled_pimples', value: 'Pus Filled Pimples'},
    {_id: 42, slug: 'blackheads', value: 'Blackheads'},
    {_id: 43, slug: 'skin_peeling', value: 'Skin Peeling'},
    {_id: 44, slug: 'dischromic_patches', value: 'Dischromic Patches'},
  ],

  Mouth: [
    {_id: 45, slug: 'ulcers_on_tongue', value: 'Ulcers On Tongue'},
    {_id: 46, slug: 'blister', value: 'Blister'},
  ],

  Left_Hand: [
    {_id: 47, slug: 'cold_hands_and_feets', value: 'Cold Hands And Feets'},
    {_id: 48, slug: 'brittle_nails', value: 'Brittle Nails'},
    {_id: 49, slug: 'small_dents_in_nails', value: 'Small Dents In Nails'},
    {_id: 50, slug: 'inflammatory_nails', value: 'Inflammatory Nails'},
    {
      _id: 51,
      slug: 'pain_during_bowel_movements',
      value: 'Pain During Bowel Movements',
    },
  ],
  Right_Hand: [
    {_id: 52, slug: 'cold_hands_and_feets', value: 'Cold Hands And Feets'},
    {_id: 53, slug: 'brittle_nails', value: 'Brittle Nails'},
    {_id: 54, slug: 'small_dents_in_nails', value: 'Small Dents In Nails'},
    {_id: 55, slug: 'inflammatory_nails', value: 'Inflammatory Nails'},
    {
      _id: 56,
      slug: 'pain_during_bowel_movements',
      value: 'Pain During Bowel Movements',
    },
  ],
  Right_Arm: [
    {_id: 57, slug: 'cold_hands_and_feets', value: 'Cold Hands And Feets'},

    {
      _id: 58,
      slug: 'pain_during_bowel_movements',
      value: 'Pain During Bowel Movements',
    },
  ],
  Left_Arm: [
    {_id: 59, slug: 'cold_hands_and_feets', value: 'Cold Hands And Feets'},

    {
      _id: 60,
      slug: 'pain_during_bowel_movements',
      value: 'Pain During Bowel Movements',
    },
  ],

  Left_Foot: [
    {_id: 61, slug: 'cold_hands_and_feets', value: 'Cold Hands And Feets'},
    {_id: 62, slug: 'painful_walking', value: 'Painful Walking'},

    {_id: 63, slug: 'scurring', value: 'Scurring'},
  ],
  Right_Foot: [
    {_id: 64, slug: 'cold_hands_and_feets', value: 'Cold Hands And Feets'},
    {_id: 65, slug: 'painful_walking', value: 'Painful Walking'},

    {_id: 66, slug: 'scurring', value: 'Scurring'},
  ],
  Right_Knee: [
    {_id: 67, slug: 'cold_hands_and_feets', value: 'Cold Hands And Feets'},
    {_id: 68, slug: 'painful_walking', value: 'Painful Walking'},
    {_id: 69, slug: 'weakness_in_limbs', value: 'Weakness In Limbs'},
    {_id: 70, slug: 'knee_pain', value: 'Knee Pain'},

    {_id: 71, slug: 'scurring', value: 'Scurring'},
  ],
  Left_Knee: [
    {_id: 72, slug: 'cold_hands_and_feets', value: 'Cold Hands And Feets'},
    {_id: 73, slug: 'painful_walking', value: 'Painful Walking'},
    {_id: 74, slug: 'weakness_in_limbs', value: 'Weakness In Limbs'},

    {_id: 75, slug: 'scurring', value: 'Scurring'},
  ],
  Left_Shin: [
    {_id: 76, slug: 'cold_hands_and_feets', value: 'Cold Hands And Feets'},
    {_id: 77, slug: 'painful_walking', value: 'Painful Walking'},
    {_id: 78, slug: 'swelling_joints', value: 'Swelling Joints'},
    {
      _id: 79,
      slug: 'prominent_veins_on_calf',
      value: 'Prominent Veins On Calf',
    },
    {_id: 80, slug: 'scurring', value: 'Scurring'},
  ],
  Right_Shin: [
    {_id: 81, slug: 'cold_hands_and_feets', value: 'Cold Hands And Feets'},
    {_id: 82, slug: 'painful_walking', value: 'Painful Walking'},
    {_id: 83, value: 'swelling_joints', value: 'Swelling Joints'},
    {
      _id: 84,
      value: 'prominent_veins_on_calf',
      value: 'Prominent Veins On Calf',
    },
    {_id: 85, slug: 'scurring', value: 'Scurring'},
  ],
  Left_Thigh: [
    {_id: 86, slug: 'cold_hands_and_feets', value: 'Cold Hands And Feets'},
    {_id: 87, slug: 'painful_walking', value: 'Painful Walking'},
    {_id: 88, slug: 'weakness_in_limbs', value: 'Weakness In Limbs'},

    {_id: 89, slug: 'swelling_joints', value: 'Swelling Joints'},

    {_id: 90, slug: 'scurring', value: 'Scurring'},
  ],
  Right_Thigh: [
    {_id: 91, slug: 'cold_hands_and_feets', value: 'Cold Hands And Feets'},
    {_id: 92, slug: 'painful_walking', value: 'Painful Walking'},
    {_id: 93, slug: 'weakness_in_limbs', value: 'Weakness In Limbs'},

    {_id: 94, slug: 'swelling_joints', value: 'Swelling Joints'},
  ],
  Right_Ankle: [
    {_id: 95, slug: 'cold_hands_and_feets', value: 'Cold Hands And Feets'},
    {_id: 96, slug: 'painful_walking', value: 'Painful Walking'},

    {_id: 97, slug: 'swelling_joints', value: 'Swelling Joints'},

    {_id: 98, slug: 'scurring', value: 'Scurring'},
  ],
  Left_Ankle: [
    {_id: 99, slug: 'cold_hands_and_feets', value: 'Cold Hands And Feets'},
    {_id: 100, slug: 'painful_walking', value: 'Painful Walking'},

    {_id: 101, slug: 'swelling_joints', value: 'Swelling Joints'},

    {_id: 102, slug: 'scurring', value: 'Scurring'},
  ],
  Stomach: [
    {_id: 103, slug: 'stomach_pain', value: 'Stomach Pain'},
    {_id: 104, slug: 'acidity', value: 'Acidity'},
    {_id: 105, slug: 'vomiting', value: 'Vomiting'},
    {_id: 106, slug: 'indigestion', value: 'Indigestion'},
    {_id: 107, slug: 'nausea', value: 'Nausea'},
    {_id: 108, slug: 'loss_of_appetite', value: 'Loss Of Appetite'},
    {_id: 109, slug: 'constipation', value: 'Constipation'},
    {_id: 110, slug: 'abdominal_pain', value: 'Abdominal Pain'},
    {_id: 111, slug: 'diarrhoea', value: 'Diarrhoea'},
    {_id: 112, slug: 'swelling_of_stomach', value: 'Swelling Of Stomach'},
    {_id: 113, slug: 'obesity', value: 'Obesity'},
    {_id: 114, slug: 'belly_pain', value: 'Belly Pain'},
    {_id: 115, slug: 'stomach_bleeding', value: 'Stomach Bleeding'},
    {_id: 116, slug: 'fluid_overload', value: 'Fluid Overload'},
    {_id: 117, slug: 'phlegm', value: 'Phlegm'},
    {_id: 118, slug: 'excessive_hunger', value: 'Excessive Hunger'},
    {_id: 119, slug: 'increased_appetite', value: 'Increased Appetite'},
    {_id: 120, slug: 'distention_of_abdomen', value: 'Distention Of Abdomen'},
  ],
  Throat: [
    {_id: 121, slug: 'enlarged_thyroid', value: 'Enlarged Thyroid'},
    {_id: 122, slug: 'palpitations', value: 'Palpitations'},
    {_id: 123, slug: 'cough', value: 'Cough'},
    {_id: 124, slug: 'throat_irritation', value: 'Throat Irritation'},
    {_id: 125, slug: 'neck_pain', value: 'Neck Pain'},
    {_id: 126, slug: 'stiff_neck', value: 'Stiff Neck'},
    {_id: 127, slug: 'patches_on_throat', value: 'Patches On Throat'},
  ],
  Full_Body: [
    {_id: 128, slug: 'swelled_lymph_nodes', value: 'Swelled Lymph Nodes'},
    {_id: 129, slug: 'malaise', value: 'Malaise'},
    {_id: 130, slug: 'swollen_extremeties', value: 'Swollen Extremeties'},
    {_id: 131, slug: 'movement_stiffness', value: 'Movement Stiffness'},
    {_id: 132, slug: 'loss_of_balance', value: 'Loss Of Balance'},
    {_id: 133, slug: 'irritability', value: 'Irritability'},
    {
      _id: 134,
      slug: 'receiving_blood_transfusion',
      value: 'Receiving Blood Transfusion',
    },
    {
      _id: 135,
      slug: 'receiving_unsterile_injections',
      value: 'Receiving Unsterile Injections',
    },
    {_id: 136, slug: 'silver_like_dusting ', value: 'Silver Like Dusting'},
    {_id: 137, slug: 'yellow_crust_ooze', value: 'Yellow Crust Ooze'},
    {
      _id: 138,
      slug: 'weakness_of_one_body_side',
      value: 'Weakness Of One Body Side',
    },
    {_id: 139, slug: 'muscle_pain', value: 'Muscle Pain'},
    {_id: 140, slug: 'red_spots_over_body', value: 'Red Spots Over Body'},
    {_id: 141, slug: 'muscle_wasting', value: 'Muscle Wasting'},
    {_id: 142, slug: 'fatigue', value: 'Fatigue'},
    {_id: 143, slug: 'weight_gain', value: 'Weight Gain'},
    {_id: 144, slug: 'weight_loss', value: 'Weight Loss'},
    {_id: 145, slug: 'irregular_sugar_level', value: 'Irregular Sugar Level'},
    {_id: 146, slug: 'muscle_weakness', value: 'Muscle Weakness'},
    {id: 147, slug: 'toxic_look(typhos)', value: 'Toxic Look(Typhos)'},
  ],

  Left_Hip: [{_id: 148, slug: 'hip_joint_pain', value: 'Hip Joint Pain'}],
  Right_Hip: [{_id: 149, slug: 'hip_joint_pain', value: 'Hip Joint Pain'}],
  Chest: [
    {_id: 150, slug: 'breathlessness', value: 'Breathlessness'},
    {_id: 151, slug: 'chest_pain', value: 'Chest_Pain'},
    {_id: 152, slug: 'fast_heart_rate', value: 'Fast Heart Rate'},
    {_id: 153, slug: 'mucoid_sputum', value: 'Muscoid Sputum'},
    {_id: 154, slug: 'rusty_sputum', value: 'Rusty Sputum'},
    {_id: 155, slug: 'blood_in_sputum', value: 'Blood In Sputum'},
    {_id: 156, slug: 'palpitations', value: 'Palpitations'},
  ],
  Back: [{_id: 157, slug: 'back_pain', value: 'Back Pain'}],
  Left_Ear: [{_id: 157, slug: 'pain', value: 'Pain'}],
  Right_Ear: [{_id: 157, slug: 'pain', value: 'Pain'}],
};

const Settings = ({navigation, route}) => {
  const [showFab, setShowFab] = useState(true);
  const [selectedAreaId, setSelectedAreaId] = useState([]);
  const [visible, setVisible] = useState(false);
  const [bodyPart, setBodyPart] = useState('Nose');
  const [expanded, setExpanded] = useState(true);
  const [rotated, setRotated] = useState(true);
  const [showGuidlines, setShowGuidlines] = useState(true);

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
  useEffect(() => {
    setTimeout(() => {
      hideGuidlines();
    }, 2000);
  }, []);
  const hideGuidlines = () => {
    setShowGuidlines(false);
  };
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
        showMenu={true}
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
        {showFab && (
          <FloatingButton
            onRotate={onModelRotate}
            onDone={() => {
              console.log(selectedSymptoms.selectedList);
              const symptomsList = selectedSymptoms.selectedList.map(
                obj => obj.slug,
              );
              console.log('Done with Symptoms', symptomsList);
              setShowFab(false);
              navigation.navigate('Results', {
                symptomsList,
              });
            }}
          />
        )}
      </View>
      <View style={{flex: 1, alignItems: 'center', padding: 0}}>
        {showGuidlines && (
          <Portal>
            <Guidlines />
          </Portal>
        )}
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

      <List.Section
        style={{
          maxHeight: 400,
        }}>
        <List.Accordion
          style={styles.listAccordionStyles}
          titleStyle={{color: '#FFFFFF'}}
          descriptionStyle={{color: '#FFFFFF'}}
          title="Symptoms"
          description="list of your all selected symptoms"
          left={props => <List.Icon {...props} icon="equal" color="#FFFFFF" />}
          expanded={expanded}
          onPress={handlePress}>
          <ScrollView style={styles.scrollView}>
            {renderModalWithSymptoms(selectedSymptoms.selectedList)}
          </ScrollView>
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
  scrollView: {
    backgroundColor: 'white',
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
