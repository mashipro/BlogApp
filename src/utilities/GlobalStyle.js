import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  backgroundContainerCentered: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
    justifyContent: 'center',
  },
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  backgroundContainerNoPadding: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    // padding: 16,
    // backgroundColor: 'red'
  },
  backgroundContainerInset: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor:'red'
  },

  //COMPONENTS STYLING ////////////////////////////////////
  //EditText Style  <<<<<
  editTextContainer: {
    marginVertical: 8,
  },
  editTextTextInputContainer: {
    borderWidth: 2,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  editTextTitle: {
    margin: 2,
    fontWeight: 'bold',
    fontSize: 16,
  },
  editTextTextInput: {
    fontSize: 16,
  },

  //Button Style    <<<<<
  buttonContainer: {
    marginVertical: 8,
  },
  buttonTouchable: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    overflow: 'hidden',
  },
  buttonTouchableText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 8,
    marginVertical: 20,
  },

  //blogpost Style    <<<
  blogpostHeroContainer: {
    backgroundColor: 'red',
    height: 350,
    marginVertical: 4,
  },
  blogpostHeroImage: {
    height: '100%',
    backgroundColor: 'blue',
    justifyContent: 'flex-end',
  },
  blogpostTextContainer: {
    margin: 8,
    // backgroundColor:'green' //to be called off
  },
  blogpostSubTextContainer: {
    flexDirection: 'row',
  },
  blogpostTextTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
  },
  blogpostTextSubTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  blogpostTextLink: {fontSize: 14, fontWeight: '100', color: 'white'},

  //avatarCircle Style    <<<
  avatarCircleImage: {
    backgroundColor: 'green',
    borderRadius: 200,
    marginRight: 10,
  },
  avatarStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  avatarStatsItemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    borderWidth: 1,
    borderRadius: 10,
  },
  avatarTextTitle: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  avatarTextSubTitle: {
    fontSize: 20,
    fontWeight: '300',
  },
  avatarTextTitleHero: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  avatarTextSubTitleHero: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  //CUSTOM GLOBAL STYLING /////////////////////////////////
  textHeroTitle: {
    fontSize: 50,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  textHeroSubTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  textLargeTitle: {
    fontSize: 40,
    fontWeight: '200',
    marginVertical: 5,
  },
  textLargeSubTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
  },
});
