// // import {
// //   FlatList,
// //   ImageBackground,
// //   SafeAreaView,
// //   StatusBar,
// //   StyleSheet,
// //   Text,
// //   TouchableOpacity,
// //   View,
// // } from 'react-native';
// // import React, {useEffect, useState} from 'react';
// // import Color from '../../utils/Colors';
// // import Header from '../../component/Header';
// // import {useIsFocused, useNavigation} from '@react-navigation/native';
// // import {WaveIndicator} from 'react-native-indicators';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import {fetchAllVoucher} from '../../api/auth_api';
// // import {moderateScale, textScale} from '../../utils/Responsive';
// // import FontFamily from '../../utils/FontFamily';

// // const AvailableRoomToJoin = () => {
// //   const navigation = useNavigation();
// //   const [availableRoom, setAvailableRoom] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const focused = useIsFocused();

// //   const imageArray = [
// //     require('../../assets/image/Room1.png'),
// //     require('../../assets/image/Room2.png'),
// //     require('../../assets/image/Room3.png'),
// //     require('../../assets/image/Room4.png'),
// //     require('../../assets/image/Room5.png'),
// //     require('../../assets/image/Room6.png'),
// //     require('../../assets/image/Room7.png'),
// //     require('../../assets/image/Room8.png'),
// //     require('../../assets/image/Room9.png'),
// //     require('../../assets/image/Room10.png'),
// //   ];

// //   useEffect(() => {
// //     fetchAvailableRoomData();
// //   }, []);

// //   const fetchAvailableRoomData = async () => {
// //     setLoading(true);
// //     const userData = await AsyncStorage.getItem('userData');
// //     const parsedData = JSON.parse(userData);
// //     const data = {
// //       user_id: parsedData?.id,
// //     };
// //     try {
// //       const response = await fetchAllVoucher(data);
// //       if (response?.status_code === 200) {
// //         const openRooms = response?.data?.filter(item => item.room === 'open');
// //         setAvailableRoom(openRooms);
// //       }
// //     } catch (error) {
// //       showMessage({
// //         icon: 'warning',
// //         type: 'warning',
// //         message: error.message || 'An error occurred',
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const renderRoomItem = ({item, index}) => {
// //     const imageIndex = index % imageArray.length;
// //     console.log(item,"Line 70")

// //     return (
// //       <TouchableOpacity
// //         style={styles.itemHolder}
// //         onPress={() =>
// //           navigation.navigate('Scratch Card', {
// //             item: item,
// //             image: imageArray[imageIndex],
// //           })
// //         }>
// //         <ImageBackground
// //           source={imageArray[imageIndex]}
// //           resizeMode="stretch"
// //           style={styles.backgroundImage}
// //         />
// //       </TouchableOpacity>
// //     );
// //   };

// //   return (
// //     <View style={styles.main}>
// //       <SafeAreaView style={{backgroundColor: Color.white}} />
// //       <StatusBar backgroundColor={Color.white} barStyle={'dark-content'} />
// //       <Header />

// //       {loading ? (
// //         <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
// //           <WaveIndicator color={Color.red} />
// //         </View>
// //       ) : availableRoom.length > 0 ? (
// //         <View>
// //           <Text
// //             style={{
// //               color: Color.blue,
// //               fontFamily: FontFamily.Inter_Medium,
// //               fontSize: textScale(18),
// //               textAlign: 'center',
// //             }}>
// //             Your available room list are
// //           </Text>
// //           <FlatList
// //             data={availableRoom}
// //             keyExtractor={(item, index) => `${item.id}-${index}`}
// //             renderItem={renderRoomItem}
// //             contentContainerStyle={{padding: 10}}
// //           />
// //         </View>
// //       ) : (
// //         <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
// //           <Text
// //             style={{
// //               color: Color.primary,
// //               fontFamily: FontFamily.Inter_Medium,
// //               fontSize: textScale(18),
// //             }}>
// //             No open rooms available
// //           </Text>
// //         </View>
// //       )}
// //     </View>
// //   );
// // };

// // export default AvailableRoomToJoin;

// // const styles = StyleSheet.create({
// //   main: {
// //     flex: 1,
// //     backgroundColor: Color.white,
// //   },
// //   roomItem: {
// //     padding: 16,
// //     marginBottom: 12,
// //     backgroundColor: Color.lightGray,
// //     borderRadius: 8,
// //   },
// //   roomName: {
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //     color: Color.black,
// //   },
// //   itemHolder: {
// //     borderWidth: 2,
// //     margin: moderateScale(5),
// //     width: '100%',
// //     alignSelf: 'center',
// //     alignItems: 'center',
// //     borderColor: Color.borderColor,
// //     backgroundColor: Color.borderColor,
// //     justifyContent: 'center',
// //     borderRadius: moderateScale(5),
// //     height: moderateScale(150),
// //   },
// //   backgroundImage: {
// //     width: '100%',
// //     height: '100%',
// //   },
// // });

// import {
//     FlatList,
//     ImageBackground,
//     SafeAreaView,
//     StatusBar,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
//   } from 'react-native';
//   import React, {useEffect, useState} from 'react';
//   import Color from '../../utils/Colors';
//   import Header from '../../component/Header';
//   import {useNavigation} from '@react-navigation/native';
//   import {WaveIndicator} from 'react-native-indicators';
//   import AsyncStorage from '@react-native-async-storage/async-storage';
//   import {fetchAllVoucher, timer} from '../../api/auth_api';
//   import {moderateScale, textScale} from '../../utils/Responsive';
//   import FontFamily from '../../utils/FontFamily';
//   import moment from 'moment';

//   const AvailableRoomToJoin = () => {
//     const navigation = useNavigation();
//     const [availableRoom, setAvailableRoom] = useState([]);
//     const [gameTimes, setGameTimes] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const imageArray = [
//       require('../../assets/image/Room1.png'),
//       require('../../assets/image/Room2.png'),
//       require('../../assets/image/Room3.png'),
//       require('../../assets/image/Room4.png'),
//       require('../../assets/image/Room5.png'),
//       require('../../assets/image/Room6.png'),
//       require('../../assets/image/Room7.png'),
//       require('../../assets/image/Room8.png'),
//       require('../../assets/image/Room9.png'),
//       require('../../assets/image/Room10.png'),
//     ];

//     useEffect(() => {
//       fetchAvailableRoomData();
//       fetchGameTimes();
//     }, []);

//     const fetchAvailableRoomData = async () => {
//       setLoading(true);
//       const userData = await AsyncStorage.getItem('userData');
//       const parsedData = JSON.parse(userData);
//       const data = {user_id: parsedData?.id};

//       try {
//         const response = await fetchAllVoucher(data);
//         if (response?.status_code === 200) {
//           const openRooms = response?.data?.filter(item => item.room === 'open');
//           setAvailableRoom(openRooms);
//         }
//       } catch (error) {
//         console.error('Error fetching rooms:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchGameTimes = async () => {
//       try {
//         const response = await timer();

//         if (response?.status_code === 200) {
//           const today = moment().format('YYYY-MM-DD');
//           const filteredTimes = response?.data?.filter(game =>
//             moment(game.date_time).isSame(today, 'day'),
//           );
//           setGameTimes(filteredTimes);
//         }
//       } catch (error) {
//         console.error('Error fetching game times:', error);
//       }
//     };

//     const calculateRemainingTime = (dateTime) => {
//       const now = moment();
//       const gameTime = moment(dateTime);
//       const duration = moment.duration(gameTime.diff(now));

//       return `${Math.max(0, duration.hours())}h:${Math.max(0, duration.minutes())}m:${Math.max(0, duration.seconds())}s`;
//     };

//     const renderRoomItem = ({item, index}) => {
//       const imageIndex = index % imageArray.length;
//       const gameTime = gameTimes.find(game => game.id === item.id);

//       return (
//         <TouchableOpacity
//           style={styles.itemHolder}
//           onPress={() =>
//             navigation.navigate('Scratch Card', {
//               item: item,
//               image: imageArray[imageIndex],
//             })
//           }>
//           <ImageBackground
//             source={imageArray[imageIndex]}
//             resizeMode="stretch"
//             style={styles.backgroundImage}>
//             {gameTime && (
//               <View style={styles.textOverlay}>
//                 <Text style={styles.text}>
//                   Starts in: {calculateRemainingTime(gameTime.date_time)}
//                 </Text>
//               </View>
//             )}
//           </ImageBackground>
//         </TouchableOpacity>
//       );
//     };

//     return (
//       <View style={styles.main}>
//         <SafeAreaView style={{backgroundColor: Color.white}} />
//         <StatusBar backgroundColor={Color.white} barStyle={'dark-content'} />
//         <Header />

//         {loading ? (
//           <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//             <WaveIndicator color={Color.red} />
//           </View>
//         ) : availableRoom.length > 0 ? (
//           <FlatList
//             data={availableRoom}
//             keyExtractor={(item, index) => `${item.id}-${index}`}
//             renderItem={renderRoomItem}
//             contentContainerStyle={{padding: 10}}
//           />
//         ) : (
//           <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//             <Text
//               style={{
//                 color: Color.primary,
//                 fontFamily: FontFamily.Inter_Medium,
//                 fontSize: textScale(18),
//               }}>
//               No open rooms available
//             </Text>
//           </View>
//         )}
//       </View>
//     );
//   };

//   export default AvailableRoomToJoin;

//   const styles = StyleSheet.create({
//     main: {
//       flex: 1,
//       backgroundColor: Color.white,
//     },
//     itemHolder: {
//       borderWidth: 2,
//       margin: moderateScale(5),
//       width: '100%',
//       alignSelf: 'center',
//       alignItems: 'center',
//       borderColor: Color.borderColor,
//       backgroundColor: Color.borderColor,
//       justifyContent: 'center',
//       borderRadius: moderateScale(5),
//       height: moderateScale(150),
//     },
//     backgroundImage: {
//       width: '100%',
//       height: '100%',
//     },
//     textOverlay: {
//       backgroundColor: 'rgba(0, 0, 0, 0.5)',
//       position: 'absolute',
//       bottom: 0,
//       width: '100%',
//       padding: moderateScale(5),
//     },
//     text: {
//       fontFamily: FontFamily.Inter_Medium,
//       fontSize: textScale(16),
//       color: Color.white,
//       textAlign: 'center',
//     },
//   });

// import {
//     FlatList,
//     ImageBackground,
//     SafeAreaView,
//     StatusBar,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
//   } from 'react-native';
//   import React, {useEffect, useState} from 'react';
//   import Color from '../../utils/Colors';
//   import Header from '../../component/Header';
//   import {useIsFocused, useNavigation} from '@react-navigation/native';
//   import {WaveIndicator} from 'react-native-indicators';
//   import AsyncStorage from '@react-native-async-storage/async-storage';
//   import {fetchAllVoucher, timer} from '../../api/auth_api'; // Ensure timer API is imported
//   import {moderateScale, textScale} from '../../utils/Responsive';
//   import FontFamily from '../../utils/FontFamily';

//   const AvailableRoomToJoin = () => {
//     const navigation = useNavigation();
//     const [availableRoom, setAvailableRoom] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [waitingTimes, setWaitingTimes] = useState({});
//     const focused = useIsFocused();



//     useEffect(() => {
//       fetchAvailableRoomData();
//     }, []);

//     const fetchAvailableRoomData = async () => {
//       setLoading(true);
//       const userData = await AsyncStorage.getItem('userData');
//       const parsedData = JSON.parse(userData);
//       const data = {
//         user_id: parsedData?.id,
//       };
//       try {
//         const response = await fetchAllVoucher(data);
//         if (response?.status_code === 200) {
//           const openRooms = response?.data?.filter(item => item.room === 'open');
//           setAvailableRoom(openRooms);
//           fetchNextGameTimes(openRooms);
//         }
//       } catch (error) {
//         showMessage({
//           icon: 'warning',
//           type: 'warning',
//           message: error.message || 'An error occurred',
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchNextGameTimes = async rooms => {
//       try {
//         const data = {coupon: 1};
//         const response = await timer(data);

//         if (response?.status_code === 200) {
//           const today = new Date();
//           const filteredGames = response.data.filter(item => {
//             const gameTime = new Date(item.date_time);
//             return gameTime > today;
//           });

//           if (filteredGames.length > 0) {
//             const updatedTimes = {};

//             rooms.forEach(room => {
//               const nextGame = filteredGames[0];
//               const nextGameTime = new Date(nextGame.date_time);
//               const timeDifference = Math.floor((nextGameTime - today) / 1000);

//               updatedTimes[room.id] = timeDifference;
//             });

//             setWaitingTimes(updatedTimes);
//           }
//         } else {
//           showMessage({
//             icon: 'info',
//             type: 'info',
//             message: response?.message || 'Failed to fetch game times!',
//           });
//         }
//       } catch (error) {
//         showMessage({
//           icon: 'warning',
//           type: 'warning',
//           message: 'Error fetching game times!',
//         });
//       }
//     };

//     const formatTime = seconds => {
//       const hours = Math.floor(seconds / 3600);
//       const minutes = Math.floor((seconds % 3600) / 60);
//       const secs = seconds % 60;
//       return `${hours}h ${minutes}m ${secs}s`;
//     };

//     const renderRoomItem = ({item, index}) => {
//       const imageIndex = index % imageArray.length;
//       const remainingTime = waitingTimes[item.id] || 0;

//       return (
//         <TouchableOpacity
//           style={styles.itemHolder}
//           onPress={() =>
//             navigation.navigate('Scratch Card', {
//               item: item,
//               image: imageArray[imageIndex],
//             })
//           }>
//           <ImageBackground
//             source={imageArray[imageIndex]}
//             resizeMode="stretch"
//             style={styles.backgroundImage}>
//             <View style={styles.timeOverlay}>
//               <Text style={styles.timeText}>
//                 {remainingTime > 0
//                   ? `Next Game: ${formatTime(remainingTime)}`
//                   : 'Loading...'}
//               </Text>
//             </View>
//           </ImageBackground>
//         </TouchableOpacity>
//       );
//     };

//     return (
//       <View style={styles.main}>
//         <SafeAreaView style={{backgroundColor: Color.white}} />
//         <StatusBar backgroundColor={Color.white} barStyle={'dark-content'} />
//         <Header />

//         {loading ? (
//           <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//             <WaveIndicator color={Color.red} />
//           </View>
//         ) : availableRoom.length > 0 ? (
//           <View>
//             <Text
//               style={{
//                 color: Color.blue,
//                 fontFamily: FontFamily.Inter_Medium,
//                 fontSize: textScale(18),
//                 textAlign: 'center',
//               }}>
//               Your available room list
//             </Text>
//             <FlatList
//               data={availableRoom}
//               keyExtractor={(item, index) => `${item.id}-${index}`}
//               renderItem={renderRoomItem}
//               contentContainerStyle={{padding: 10}}
//             />
//           </View>
//         ) : (
//           <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//             <Text
//               style={{
//                 color: Color.primary,
//                 fontFamily: FontFamily.Inter_Medium,
//                 fontSize: textScale(18),
//               }}>
//               No open rooms available
//             </Text>
//           </View>
//         )}
//       </View>
//     );
//   };

//   export default AvailableRoomToJoin;

//   const styles = StyleSheet.create({
//     main: {
//       flex: 1,
//       backgroundColor: Color.white,
//     },
//     itemHolder: {
//       borderWidth: 2,
//       margin: moderateScale(5),
//       width: '100%',
//       alignSelf: 'center',
//       alignItems: 'center',
//       borderColor: Color.borderColor,
//       backgroundColor: Color.borderColor,
//       justifyContent: 'center',
//       borderRadius: moderateScale(5),
//       height: moderateScale(150),
//     },
//     backgroundImage: {
//       width: '100%',
//       height: '100%',
//     },
//     timeOverlay: {
//       position: 'absolute',
//       bottom: 10,
//       left: 10,
//       backgroundColor: 'rgba(0, 0, 0, 0.5)',
//       padding: 5,
//       borderRadius: 5,
//     },
//     timeText: {
//       color: Color.white,
//       fontSize: textScale(14),
//       fontFamily: FontFamily.Inter_Medium,
//     },
//   });

import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Color from '../../utils/Colors';
import Header from '../../component/Header';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {WaveIndicator} from 'react-native-indicators';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchAllVoucher, timer} from '../../api/auth_api';
import {moderateScale, textScale} from '../../utils/Responsive';
import FontFamily from '../../utils/FontFamily';

const AvailableRoomToJoin = () => {
  const navigation = useNavigation();
  const [availableRoom, setAvailableRoom] = useState([]);
  const [loading, setLoading] = useState(true);
  const [waitingTimes, setWaitingTimes] = useState({}); // Store waiting times for each room

     const imageArray = [
      require('../../assets/image/Room1.png'),
      require('../../assets/image/Room2.png'),
      require('../../assets/image/Room3.png'),
      require('../../assets/image/Room4.png'),
      require('../../assets/image/Room5.png'),
      require('../../assets/image/Room6.png'),
      require('../../assets/image/Room7.png'),
      require('../../assets/image/Room8.png'),
      require('../../assets/image/Room9.png'),
      require('../../assets/image/Room10.png'),
    ];

  useEffect(() => {
    fetchAvailableRoomData();
  }, []);

  useEffect(() => {
    // Start the real-time timer
    const interval = setInterval(() => {
      setWaitingTimes(prevTimes =>
        Object.fromEntries(
          Object.entries(prevTimes).map(([roomId, time]) => [
            roomId,
            time > 0 ? time - 1 : 0,
          ]),
        ),
      );
    }, 1000);

    return () => clearInterval(interval); // Clear interval on unmount
  }, [waitingTimes]);

  useEffect(() => {
    // Fetch game times for all rooms after loading them
    if (availableRoom.length > 0) {
      availableRoom.forEach(room => {
        fetchNextGameTimeForRoom(room.id, room?.amount);
      });
    }
  }, [availableRoom]);

  const fetchAvailableRoomData = async () => {
    setLoading(true);
    const userData = await AsyncStorage.getItem('userData');
    const parsedData = JSON.parse(userData);
    const data = {
      user_id: parsedData?.id,
    };
    try {
      const response = await fetchAllVoucher(data);
      if (response?.status_code === 200) {
        const openRooms = response?.data?.filter(item => item.room === 'open');
        setAvailableRoom(openRooms);
      }
    } catch (error) {
      showMessage({
        icon: 'warning',
        type: 'warning',
        message: error.message || 'An error occurred',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchNextGameTimeForRoom = async (roomId, coupon) => {
    try {
      const data = {coupon};
      const response = await timer(data);

      if (response?.status_code === 200) {
        const today = new Date();
        const filteredGames = response.data.filter(item => {
          const gameTime = new Date(item.date_time);
          return gameTime > today;
        });

        if (filteredGames.length > 0) {
          const nextGame = filteredGames[0];
          const nextGameTime = new Date(nextGame.date_time);
          const timeDifference = Math.floor((nextGameTime - today) / 1000);

          setWaitingTimes(prev => ({...prev, [roomId]: timeDifference}));
        } else {
          setWaitingTimes(prev => ({...prev, [roomId]: 0}));
        }
      } else {
        showMessage({
          icon: 'info',
          type: 'info',
          message: response?.message || 'Failed to fetch game times!',
        });
      }
    } catch (error) {
      showMessage({
        icon: 'warning',
        type: 'warning',
        message: 'Error fetching game times!',
      });
    }
  };

  const formatTime = seconds => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const renderRoomItem = ({item, index}) => {
    console.log(item,"line 719")
    const imageIndex = index % imageArray.length;
    const remainingTime = waitingTimes[item.id] || 0;

    return (
      <TouchableOpacity
        style={styles.itemHolder}
        onPress={() =>
          navigation.navigate('Scratch Card', {
            item: item,
            image: imageArray[imageIndex],
          })
        }>
        <ImageBackground
          source={imageArray[item?.id-1]}
          resizeMode="stretch"
          style={styles.backgroundImage}>
          <View style={styles.timeOverlay}>
            <Text style={styles.timeText}>
              {remainingTime > 0
                ? `Next Game: ${formatTime(remainingTime)}`
                : 'Game Starting Soon'}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.main}>
      <SafeAreaView style={{backgroundColor: Color.white}} />
      <StatusBar backgroundColor={Color.white} barStyle={'dark-content'} />
      <Header />

      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <WaveIndicator color={Color.red} />
        </View>
      ) : availableRoom.length > 0 ? (
        <View>
          <Text
            style={{
              color: Color.blue,
              fontFamily: FontFamily.Inter_Medium,
              fontSize: textScale(18),
              textAlign: 'center',
            }}>
            Your available room list are
          </Text>
          <FlatList
            data={availableRoom}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={renderRoomItem}
            contentContainerStyle={{padding: 10}}
          />
        </View>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              color: Color.primary,
              fontFamily: FontFamily.Inter_Medium,
              fontSize: textScale(18),
            }}>
            No open rooms available
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Color.white,
  },
  itemHolder: {
    borderWidth: 2,
    margin: moderateScale(5),
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    borderColor: Color.borderColor,
    backgroundColor: Color.borderColor,
    justifyContent: 'center',
    borderRadius: moderateScale(5),
    height: moderateScale(150),
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  timeOverlay: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 5,
    padding: 5,
  },
  timeText: {
    color: Color.white,
    fontFamily: FontFamily.Inter_Medium,
    fontSize: textScale(14),
  },
});

export default AvailableRoomToJoin;
