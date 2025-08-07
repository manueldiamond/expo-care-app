import BlurredCircles from '@/components/blurred-circles';
import { Section } from '@/components/global/Section';
import PhotoPickerSheet from '@/components/PhotoPickerSheet';
import Button from '@/components/ui/button';
import Select from '@/components/ui/select';
import tw from '@/lib/tailwind';
import { addVerification } from '@/services/caregiver-service';
import { useUserStore } from '@/stores/user-store';
import { extractApiError } from '@/utils/api-error';
import { showToast } from '@/utils/toast';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const documentTypes = [
  { label: 'Ghana Card', value: 'ghana_card' },
  { label: 'Passport', value: 'passport' },
  { label: 'Driver\'s License', value: 'drivers_license' },
];

type VerificationFormValues = {
  documentType: string;
};

const BeginVerificationScreen = () => {
  const caregiverId = useUserStore(s => s.user?.caregiver?.id);
  const router = useRouter();
  const { control, handleSubmit, watch } = useForm<VerificationFormValues>({
    defaultValues: {
      documentType: '',
    },
  });
  const documentType = watch('documentType');
  const [documentImage, setDocumentImage] = useState<string | null>(null);
  const [photoImage, setPhotoImage] = useState<string | null>(null);
  const [photoPickerVisible, setPhotoPickerVisible] = useState(false);
  const [documentPickerVisible, setDocumentPickerVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!caregiverId) return null;

  const handleDocumentSelected = (uri: string) => {
    setDocumentImage(uri);
  };

  const handlePhotoSelected = (uri: string) => {
    setPhotoImage(uri);
  };

  const onSubmit = async (data: VerificationFormValues) => {
    if (!data.documentType) {
      showToast.error('Error', 'Please select a document type');
      return;
    }
    if (!documentImage) {
      showToast.error('Error', 'Please upload a document image');
      return;
    }
    if (!photoImage) {
      showToast.error('Error', 'Please take a photo');
      return;
    }
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append('documentType', data.documentType);
      formData.append('document', {
        uri: documentImage,
        type: 'image/jpeg',
        name: 'document.jpg',
      } as any);
      formData.append('photo', {
        uri: photoImage,
        type: 'image/jpeg',
        name: 'photo.jpg',
      } as any);
      await addVerification(formData);
      showToast.success('Verification submitted successfully');
      router.push('/home');
    } catch (error) {
      //console.log("ERERERERE",JSON.stringify(error));
      showToast.error(extractApiError(error, 'Error submitting verification'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const isVerificationComplete = !!documentType && !!documentImage && !!photoImage;

  return (
    <View style={tw`flex-1 bg-medical-neutral`}>
      <BlurredCircles />
      <ScrollView style={tw`flex-1`}>
        <View style={tw`container mt-4`}>
          {/* Document Section */}
          <Section title="Document">
            <View style={tw`gap-6`}>
              {/* Document Type */}
              <View>
                <Text style={tw`medical-text text-base font-semibold mb-2`}>Document Type</Text>
                <Select
                  name="documentType"
                  control={control}
                  options={documentTypes}
                  placeholder="Select document type"
                />
              </View>
              {/* Upload Document */}
              <View>
                <Text style={tw`medical-text text-base font-semibold mb-2`}>Upload Document</Text>
                <TouchableOpacity
                  style={tw`w-full h-32 border-2 border-dashed border-medical-border rounded-lg items-center justify-center bg-medical-neutral`}
                  onPress={() => setDocumentPickerVisible(true)}
                  activeOpacity={0.7}
                >
                  {documentImage ? (
                    <View style={tw`w-full h-full`}>
                      <Image
                        source={{ uri: documentImage }}
                        style={tw`w-full h-full rounded-lg`}
                        resizeMode="cover"
                      />
                      <TouchableOpacity
                        style={tw`absolute top-2 right-2 bg-medical-error rounded-full w-6 h-6 items-center justify-center`}
                        onPress={() => setDocumentImage(null)}
                      >
                        <MaterialIcons name="close" size={16} color="white" />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={tw`items-center`}>
                      <MaterialIcons
                        name="add-photo-alternate"
                        size={32}
                        color={tw.color('medical-text-light')}
                      />
                      <Text style={tw`medical-text text-sm font-semibold mt-2`}>
                        Upload Document
                      </Text>
                      <Text style={tw`medical-text-light text-xs font-normal text-center mt-1`}>
                        Tap to upload your document
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </Section>
          {/* Photo Section */}
          <Section title="Photo">
            <View style={tw`gap-6`}>
              <View>
                <Text style={tw`medical-text text-base font-semibold mb-2`}>Take Photo</Text>
                <TouchableOpacity
                  style={tw`w-full h-66 border-2 border-dashed border-medical-border rounded-lg items-center justify-center bg-medical-neutral`}
                  onPress={() => setPhotoPickerVisible(true)}
                  activeOpacity={0.7}
                >
                  {photoImage ? (
                    <View style={tw`w-full h-full`}>
                      <Image
                        source={{ uri: photoImage }}
                        style={tw`w-full h-full rounded-lg`}
                        resizeMode="cover"
                      />
                      <TouchableOpacity
                        style={tw`absolute top-2 right-2 bg-medical-error rounded-full w-6 h-6 items-center justify-center`}
                        onPress={() => setPhotoImage(null)}
                      >
                        <MaterialIcons name="close" size={16} color="white" />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={tw`items-center`}>
                      <MaterialIcons
                        name="camera-alt"
                        size={32}
                        color={tw.color('medical-text-light')}
                      />
                      <Text style={tw`medical-text text-sm font-semibold mt-2`}>
                        Take Photo
                      </Text>
                      <Text style={tw`medical-text-light text-xs font-normal text-center mt-1`}>
                        Tap to take your photo
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </Section>
          {/* Submit Button */}
          <Button
            text={isSubmitting ? 'Submitting...' : 'Complete Verification'}
            onPress={handleSubmit(onSubmit)}
            //disabled={!isVerificationComplete || isSubmitting}
            style={tw`mb-6`}
          />
        </View>
      </ScrollView>
      {/* Document Picker Sheet */}
      <PhotoPickerSheet
        visible={documentPickerVisible}
        onSelected={handleDocumentSelected}
        onClose={() => setDocumentPickerVisible(false)}
        aspectRatio={[4, 3]}
        buttonLabels={{
          camera: 'Take Photo',
          gallery: 'Choose from Gallery',
          cancel: 'Cancel',
        }}
      />
      {/* Photo Picker Sheet - Camera Only */}
      <PhotoPickerSheet
        visible={photoPickerVisible}
        onSelected={handlePhotoSelected}
        onClose={() => setPhotoPickerVisible(false)}
        aspectRatio={[1, 1]}
        cameraOnly={true}
        buttonLabels={{
          camera: 'Take Photo',
          cancel: 'Cancel',
        }}
      />
    </View>
  );
};

export default BeginVerificationScreen; 