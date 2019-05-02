import React from 'react';
import {
  ImageBackground,
  ImageSourcePropType,
  ScrollView,
  View,
} from 'react-native';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import {
  Button,
  Text,
} from '@kitten/ui';
import {
  ApartmentFacilityList1,
  ApartmentFacilityList2,
  ApartmentPhotoList,
  PriceText,
} from '@src/components/ecommerce';
import { Apartment } from '@src/core/model';
import { textStyle } from '@src/components/common';

interface ComponentProps {
  apartment: Apartment;
  onBookPress: () => void;
  onPhotoPress: (index: number) => void;
}

export type RentApartmentProps = ThemedComponentProps & ComponentProps;

class RentApartmentComponent extends React.Component<RentApartmentProps> {

  private onBookPress = () => {
    this.props.onBookPress();
  };

  private onPrimaryFacilityPress = (index: number) => {

  };

  private onPhotoPress = (index: number) => {
    this.props.onPhotoPress(index);
  };

  private createImageSource = (source: string): ImageSourcePropType => {
    return { uri: source };
  };

  public render(): React.ReactNode {
    const { themedStyle, apartment } = this.props;

    return (
      <ScrollView contentContainerStyle={themedStyle.container}>
        <ImageBackground
          style={themedStyle.backgroundImage}
          source={{ uri: apartment.primaryPhoto }}
        />
        <View style={themedStyle.infoContainer}>
          <View style={themedStyle.detailsContainer}>
            <Text
              style={themedStyle.titleLabel}
              category='h6'>
              {apartment.title}
            </Text>
            <Text
              style={themedStyle.rentLabel}
              appearance='hintDark'
              category='p2'>
              Rent House
            </Text>
            <View style={themedStyle.bookContainer}>
              <PriceText
                style={themedStyle.priceLabel}
                valueStyle={themedStyle.priceValueLabel}
                scaleStyle={themedStyle.priceScaleLabel}
                scale='night'>
                {apartment.price}
              </PriceText>
              <Button
                style={themedStyle.bookButton}
                textStyle={textStyle.button}
                onPress={this.onBookPress}>
                BOOK NOW
              </Button>
            </View>
          </View>
          <View style={themedStyle.facilitiesContainer}>
            <Text
              style={themedStyle.sectionLabel}
              category='s1'>
              Facilities
            </Text>
            <ApartmentFacilityList1
              style={themedStyle.primaryFacilityList}
              data={apartment.primaryFacilities}
              onItemPress={this.onPrimaryFacilityPress}
            />
            <ApartmentFacilityList2
              style={themedStyle.facilityList}
              data={apartment.facilities}
            />
          </View>
        </View>
        <View style={themedStyle.aboutSection}>
          <Text
            style={themedStyle.sectionLabel}
            category='s1'>
            About
          </Text>
          <Text
            style={themedStyle.aboutLabel}
            appearance='hintDark'>
            {apartment.description}
          </Text>
        </View>
        <View style={themedStyle.photoSection}>
          <Text
            style={[themedStyle.sectionLabel, themedStyle.photoLabel]}
            category='s1'>
            Photos
          </Text>
          <ApartmentPhotoList
            contentContainerStyle={themedStyle.photoList}
            data={apartment.photos.map(this.createImageSource)}
            onItemPress={this.onPhotoPress}
          />
        </View>
      </ScrollView>
    );
  }
}

export const RentApartment = withStyles(RentApartmentComponent, (theme: ThemeType) => ({
  container: {
    backgroundColor: theme['color-basic-100'],
  },
  backgroundImage: {
    flex: 1,
    minHeight: 280,
    backgroundColor: theme['color-basic-200'],
  },
  infoContainer: {
    marginTop: -80,
    marginHorizontal: 16,
    borderRadius: 12,
    backgroundColor: theme['color-white'],
  },
  detailsContainer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: theme['color-basic-200'],
  },
  bookContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  facilitiesContainer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  primaryFacilityList: {
    paddingVertical: 16,
  },
  facilityList: {
    paddingVertical: 12,
  },
  aboutSection: {
    marginHorizontal: 24,
    marginVertical: 24,
  },
  photoSection: {
    marginVertical: 8,
  },
  photoList: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
  titleLabel: textStyle.headline,
  rentLabel: {
    marginTop: 24,
    ...textStyle.paragraph,
  },
  bookButton: {},
  priceLabel: {
    marginTop: 8,
  },
  priceValueLabel: {
    fontFamily: 'opensans-bold',
    fontSize: 26,
    lineHeight: 32,
  },
  priceScaleLabel: {
    fontSize: 13,
    lineHeight: 24,
    ...textStyle.paragraph,
  },
  sectionLabel: textStyle.subtitle,
  aboutLabel: {
    marginVertical: 16,
    ...textStyle.paragraph,
  },
  photoLabel: {
    marginHorizontal: 24,
  },
}));
