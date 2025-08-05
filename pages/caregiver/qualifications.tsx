import BlurredCircles from '@/components/blurred-circles';
import Loading from '@/components/loading';
import Button from '@/components/ui/button';
import tw from '@/lib/tailwind';
import { useUserStore } from '@/stores/user-store';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Qualification {
  id: number;
  title: string;
  fileURL: string;
  createdAt: string;
}

const QualificationsScreen = () => {
  const router = useRouter();
  const user = useUserStore(s => s.user);
  const [qualifications, setQualifications] = useState<Qualification[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingQualification, setAddingQualification] = useState(false);
  const [newQualificationTitle, setNewQualificationTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Dummy data for now
  const dummyQualifications: Qualification[] = [
    {
      id: 1,
      title: 'Nursing Certificate',
      fileURL: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      title: 'First Aid Certification',
      fileURL: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      createdAt: '2024-02-20'
    }
  ];

  useEffect(() => {
    loadQualifications();
  }, []);

  const loadQualifications = async () => {
    try {
      setLoading(true);
      // For now, use dummy data
      setQualifications(dummyQualifications);
      // TODO: Replace with actual API call
      // const data = await getQualifications(user?.caregiver?.id || 0);
      // setQualifications(data);
    } catch (error) {
      console.error('Error loading qualifications:', error);
      Alert.alert('Error', 'Failed to load qualifications');
    } finally {
      setLoading(false);
    }
  };

  const handleAddQualification = async () => {
    if (!newQualificationTitle.trim()) {
      Alert.alert('Error', 'Please enter a qualification title');
      return;
    }

    if (!selectedImage) {
      Alert.alert('Error', 'Please select an image');
      return;
    }

    try {
      setAddingQualification(true);
      
      // Create FormData for image upload
      const formData = new FormData();
      formData.append('title', newQualificationTitle);
      formData.append('image', {
        uri: selectedImage,
        type: 'image/jpeg',
        name: 'qualification.jpg'
      } as any);

      // TODO: Replace with actual API call
      // await addQualification(user?.caregiver?.id || 0, formData);
      
      // For now, add to local state
      const newQualification: Qualification = {
        id: Date.now(),
        title: newQualificationTitle,
        fileURL: selectedImage,
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      setQualifications([...qualifications, newQualification]);
      setNewQualificationTitle('');
      setSelectedImage(null);
      
      Alert.alert('Success', 'Qualification added successfully');
    } catch (error) {
      console.error('Error adding qualification:', error);
      Alert.alert('Error', 'Failed to add qualification');
    } finally {
      setAddingQualification(false);
    }
  };

  const handleDeleteQualification = async (qualificationId: number) => {
    Alert.alert(
      'Delete Qualification',
      'Are you sure you want to delete this qualification?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              // TODO: Replace with actual API call
              // await deleteQualification(user?.caregiver?.id || 0, qualificationId);
              
              // For now, remove from local state
              setQualifications(qualifications.filter(q => q.id !== qualificationId));
              Alert.alert('Success', 'Qualification deleted successfully');
            } catch (error) {
              console.error('Error deleting qualification:', error);
              Alert.alert('Error', 'Failed to delete qualification');
            }
          }
        }
      ]
    );
  };

  const handleImagePicker = () => {
    // TODO: Implement image picker
    // For now, use a dummy image
    setSelectedImage('https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face');
  };

  if (loading) {
    return <Loading message="Loading qualifications..." />;
  }

  return (
    <View style={tw`flex-1 bg-medical-neutral`}>
      <BlurredCircles />
      
      <ScrollView style={tw`flex-1`}>
        <View style={tw`container mt-4`}>
          {/* Header */}
          <View style={tw`flex-row items-center justify-between mb-6`}>
            <View>
              <Text style={tw`medical-text text-2xl font-bold`}>Qualifications</Text>
              <Text style={tw`medical-text-light text-sm font-normal`}>
                Manage your professional qualifications
              </Text>
            </View>
            <TouchableOpacity
              style={tw`bg-medical-primary rounded-full p-3`}
              onPress={() => router.back()}
            >
              <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Add New Qualification Form */}
          <View style={tw`medical-card p-6 mb-6`}>
            <Text style={tw`medical-text text-lg font-semibold mb-4`}>Add New Qualification</Text>
            
            <View style={tw`gap-4`}>
              {/* Title Input */}
              <View>
                <Text style={tw`medical-text text-base font-semibold mb-2`}>Qualification Title</Text>
                <TextInput
                  style={tw`bg-medical-neutral rounded-lg px-4 py-3 text-medical-text font-normal`}
                  placeholder="Enter qualification title"
                  placeholderTextColor={tw.color('medical-text-light')}
                  value={newQualificationTitle}
                  onChangeText={setNewQualificationTitle}
                />
              </View>

              {/* Image Upload */}
              <View>
                <Text style={tw`medical-text text-base font-semibold mb-2`}>Upload Image</Text>
                
                {selectedImage ? (
                  <View style={tw`relative`}>
                    <Image source={{ uri: selectedImage }} style={tw`w-full h-32 rounded-lg`} />
                    <TouchableOpacity
                      style={tw`absolute top-2 right-2 bg-medical-error rounded-full w-6 h-6 items-center justify-center`}
                      onPress={() => setSelectedImage(null)}
                    >
                      <MaterialIcons name="close" size={16} color="white" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={tw`border-2 border-dashed border-medical-border rounded-lg p-6 items-center`}
                    onPress={handleImagePicker}
                  >
                    <MaterialIcons 
                      name="add-photo-alternate" 
                      size={32} 
                      color={tw.color('medical-text-light')} 
                    />
                    <Text style={tw`medical-text text-sm font-semibold mt-2`}>
                      Select Image
                    </Text>
                    <Text style={tw`medical-text-light text-xs font-normal text-center mt-1`}>
                      Upload certificate or document image
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Add Button */}
              <Button
                text={addingQualification ? "Adding..." : "Add Qualification"}
                onPress={handleAddQualification}
                disabled={addingQualification || !newQualificationTitle.trim() || !selectedImage}
              />
            </View>
          </View>

          {/* Qualifications List */}
          <View style={tw`medical-card p-6`}>
            <Text style={tw`medical-text text-lg font-semibold mb-4`}>Your Qualifications</Text>
            
            {qualifications.length === 0 ? (
              <View style={tw`items-center py-8`}>
                <MaterialIcons 
                  name="school" 
                  size={48} 
                  color={tw.color('medical-text-light')} 
                />
                <Text style={tw`medical-text text-lg font-semibold mt-4`}>
                  No Qualifications Yet
                </Text>
                <Text style={tw`medical-text-light text-sm font-normal text-center mt-2`}>
                  Add your first qualification above
                </Text>
              </View>
            ) : (
              <View style={tw`gap-3`}>
                {qualifications.map((qualification) => (
                  <View
                    key={qualification.id}
                    style={tw`bg-medical-neutral rounded-lg p-4 flex-row items-center`}
                  >
                    <Image
                      source={{ uri: qualification.fileURL }}
                      style={tw`w-16 h-16 rounded-lg mr-4`}
                    />
                    <View style={tw`flex-1`}>
                      <Text style={tw`medical-text text-base font-semibold`}>
                        {qualification.title}
                      </Text>
                      <Text style={tw`medical-text-light text-xs font-normal mt-1`}>
                        Added on {qualification.createdAt}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={tw`bg-medical-error rounded-full p-2`}
                      onPress={() => handleDeleteQualification(qualification.id)}
                    >
                      <MaterialIcons name="delete" size={20} color="white" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default QualificationsScreen; 