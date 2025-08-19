'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Award, BarChart2, Clock, Edit, LogOut, Save, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface UserProfile {
  name: string;
  email: string;
  joinDate: string;
  bio: string;
  preferences: {
    darkMode: boolean;
    soundEffects: boolean;
    showWPM: boolean;
    showAccuracy: boolean;
  };
  stats: {
    averageWPM: number;
    averageAccuracy: number;
    totalPracticeTime: number; // in minutes
    lessonsCompleted: number;
    highestWPM: number;
  };
  achievements: {
    id: string;
    title: string;
    description: string;
    date: string;
    icon: React.ReactNode;
  }[];
  recentActivity: {
    id: string;
    type: 'lesson' | 'test' | 'practice';
    title: string;
    date: string;
    stats: {
      wpm?: number;
      accuracy?: number;
      time?: number; // in minutes
    };
  }[];
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedBio, setEditedBio] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading profile data from localStorage
  useEffect(() => {
    const loadProfile = () => {
      // Check if we have a stored profile
      const storedProfile = localStorage.getItem('userProfile');
      
      if (storedProfile) {
        // Parse the stored profile
        const parsedProfile = JSON.parse(storedProfile);
        setProfile(parsedProfile);
      } else {
        // Create a mock profile if none exists
        const mockProfile: UserProfile = {
          name: 'John Doe',
          email: 'john.doe@example.com',
          joinDate: '2023-01-15',
          bio: 'Software developer passionate about improving typing speed and coding efficiency.',
          preferences: {
            darkMode: true,
            soundEffects: true,
            showWPM: true,
            showAccuracy: true,
          },
          stats: {
            averageWPM: 65,
            averageAccuracy: 92,
            totalPracticeTime: 420, // 7 hours
            lessonsCompleted: 24,
            highestWPM: 85,
          },
          achievements: [
            {
              id: 'a1',
              title: 'Speed Demon',
              description: 'Reached 80+ WPM in a typing test',
              date: '2023-03-10',
              icon: <Award className="h-5 w-5 text-yellow-500" />,
            },
            {
              id: 'a2',
              title: 'Consistent Coder',
              description: 'Completed practice sessions for 7 days in a row',
              date: '2023-02-28',
              icon: <Award className="h-5 w-5 text-blue-500" />,
            },
            {
              id: 'a3',
              title: 'Accuracy Master',
              description: 'Achieved 95%+ accuracy in 5 consecutive tests',
              date: '2023-04-05',
              icon: <Award className="h-5 w-5 text-green-500" />,
            },
          ],
          recentActivity: [
            {
              id: 'r1',
              type: 'test',
              title: 'Typing Speed Test',
              date: '2023-04-15',
              stats: {
                wpm: 72,
                accuracy: 94,
                time: 2,
              },
            },
            {
              id: 'r2',
              type: 'lesson',
              title: 'JavaScript Functions',
              date: '2023-04-14',
              stats: {
                wpm: 68,
                accuracy: 91,
                time: 15,
              },
            },
            {
              id: 'r3',
              type: 'practice',
              title: 'TypeScript Interfaces',
              date: '2023-04-12',
              stats: {
                wpm: 65,
                accuracy: 89,
                time: 20,
              },
            },
            {
              id: 'r4',
              type: 'lesson',
              title: 'Python Classes',
              date: '2023-04-10',
              stats: {
                wpm: 62,
                accuracy: 88,
                time: 18,
              },
            },
          ],
        };
        
        // Save the mock profile to localStorage
        localStorage.setItem('userProfile', JSON.stringify(mockProfile));
        setProfile(mockProfile);
      }
      
      setIsLoading(false);
    };
    
    // Simulate network delay
    setTimeout(loadProfile, 500);
  }, []);

  // Start editing profile
  const handleEditProfile = () => {
    if (profile) {
      setEditedName(profile.name);
      setEditedBio(profile.bio);
      setIsEditing(true);
    }
  };

  // Save edited profile
  const handleSaveProfile = () => {
    if (profile) {
      const updatedProfile = {
        ...profile,
        name: editedName,
        bio: editedBio,
      };
      
      // Update state
      setProfile(updatedProfile);
      
      // Save to localStorage
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      
      // Exit edit mode
      setIsEditing(false);
    }
  };

  // Format date string
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format time duration
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  if (isLoading) {
    return (
      <div className="container py-8 flex justify-center items-center min-h-[50vh]">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container py-8">
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't load your profile. Please try again later.
          </p>
          <Link href="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-6">
        {/* Header with navigation */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <span className="text-muted-foreground">/</span>
            <span>Profile</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
          <p className="text-muted-foreground">
            View and manage your profile, statistics, and achievements.
          </p>
        </div>

        {/* Profile Overview */}
        <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
          {/* Profile Card */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle>Profile</CardTitle>
                  <CardDescription>Your personal information</CardDescription>
                </div>
                {!isEditing ? (
                  <Button variant="ghost" size="icon" onClick={handleEditProfile}>
                    <Edit className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button variant="ghost" size="icon" onClick={handleSaveProfile}>
                    <Save className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
                  <User className="h-12 w-12 text-muted-foreground" />
                </div>
                
                {isEditing ? (
                  <div className="space-y-4 w-full">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <Input
                        id="name"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="bio" className="text-sm font-medium">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        value={editedBio}
                        onChange={(e) => setEditedBio(e.target.value)}
                        className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-center">
                    <h3 className="text-xl font-bold">{profile.name}</h3>
                    <p className="text-sm text-muted-foreground">{profile.email}</p>
                    <p className="text-sm">Joined {formatDate(profile.joinDate)}</p>
                    <p className="text-sm mt-4">{profile.bio}</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/login">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Stats and Achievements */}
          <div className="space-y-6">
            {/* Stats Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
                <CardDescription>Your typing performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg">
                    <BarChart2 className="h-5 w-5 text-muted-foreground mb-2" />
                    <span className="text-2xl font-bold">{profile.stats.averageWPM}</span>
                    <span className="text-xs text-muted-foreground">Average WPM</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg">
                    <Award className="h-5 w-5 text-muted-foreground mb-2" />
                    <span className="text-2xl font-bold">{profile.stats.averageAccuracy}%</span>
                    <span className="text-xs text-muted-foreground">Average Accuracy</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg">
                    <Clock className="h-5 w-5 text-muted-foreground mb-2" />
                    <span className="text-2xl font-bold">{formatTime(profile.stats.totalPracticeTime)}</span>
                    <span className="text-xs text-muted-foreground">Practice Time</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg">
                    <span className="text-2xl font-bold">{profile.stats.lessonsCompleted}</span>
                    <span className="text-xs text-muted-foreground">Lessons Completed</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg">
                    <span className="text-2xl font-bold">{profile.stats.highestWPM}</span>
                    <span className="text-xs text-muted-foreground">Highest WPM</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs for Activity and Achievements */}
            <Tabs defaultValue="activity" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>
              <TabsContent value="activity" className="mt-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      {profile.recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-md hover:bg-muted/50 transition-colors">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            activity.type === 'test' ? 'bg-blue-500/10 text-blue-500' :
                            activity.type === 'lesson' ? 'bg-green-500/10 text-green-500' :
                            'bg-purple-500/10 text-purple-500'
                          }`}>
                            {activity.type === 'test' ? (
                              <BarChart2 className="h-5 w-5" />
                            ) : activity.type === 'lesson' ? (
                              <Award className="h-5 w-5" />
                            ) : (
                              <Clock className="h-5 w-5" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{activity.title}</h4>
                                <p className="text-xs text-muted-foreground">{formatDate(activity.date)}</p>
                              </div>
                              <div className="text-right">
                                {activity.stats.wpm && (
                                  <p className="text-sm font-medium">{activity.stats.wpm} WPM</p>
                                )}
                                {activity.stats.accuracy && (
                                  <p className="text-xs text-muted-foreground">{activity.stats.accuracy}% accuracy</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="achievements" className="mt-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      {profile.achievements.map((achievement) => (
                        <div key={achievement.id} className="flex items-start space-x-4 p-3 rounded-md hover:bg-muted/50 transition-colors">
                          <div className="h-10 w-10 rounded-full bg-muted/50 flex items-center justify-center">
                            {achievement.icon}
                          </div>
                          <div>
                            <h4 className="font-medium">{achievement.title}</h4>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">Earned on {formatDate(achievement.date)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Customize your experience</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center justify-between space-x-2">
                <label htmlFor="darkMode" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Dark Mode
                </label>
                <input
                  type="checkbox"
                  id="darkMode"
                  checked={profile.preferences.darkMode}
                  onChange={() => {
                    const updatedProfile = {
                      ...profile,
                      preferences: {
                        ...profile.preferences,
                        darkMode: !profile.preferences.darkMode,
                      },
                    };
                    setProfile(updatedProfile);
                    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
                  }}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <label htmlFor="soundEffects" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Sound Effects
                </label>
                <input
                  type="checkbox"
                  id="soundEffects"
                  checked={profile.preferences.soundEffects}
                  onChange={() => {
                    const updatedProfile = {
                      ...profile,
                      preferences: {
                        ...profile.preferences,
                        soundEffects: !profile.preferences.soundEffects,
                      },
                    };
                    setProfile(updatedProfile);
                    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
                  }}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <label htmlFor="showWPM" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Show WPM
                </label>
                <input
                  type="checkbox"
                  id="showWPM"
                  checked={profile.preferences.showWPM}
                  onChange={() => {
                    const updatedProfile = {
                      ...profile,
                      preferences: {
                        ...profile.preferences,
                        showWPM: !profile.preferences.showWPM,
                      },
                    };
                    setProfile(updatedProfile);
                    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
                  }}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <label htmlFor="showAccuracy" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Show Accuracy
                </label>
                <input
                  type="checkbox"
                  id="showAccuracy"
                  checked={profile.preferences.showAccuracy}
                  onChange={() => {
                    const updatedProfile = {
                      ...profile,
                      preferences: {
                        ...profile.preferences,
                        showAccuracy: !profile.preferences.showAccuracy,
                      },
                    };
                    setProfile(updatedProfile);
                    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
                  }}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}