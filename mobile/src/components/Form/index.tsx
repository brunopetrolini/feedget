import React, { useState } from 'react';
import { ArrowLeft } from 'phosphor-react-native';
import { 
  View, 
  TextInput, 
  Image, 
  Text, 
  TouchableOpacity 
} from 'react-native';
import { FeedbackType } from '../Widget';
import { ScreenshotButton } from '../ScreenshotButton';

import { styles } from './styles';
import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Button } from '../Button';
import { captureScreen } from 'react-native-view-shot';
import { api } from '../../libs/api';

interface Props {
  feedbackType: FeedbackType;
  onFeedbackCanceled: () => void;
  onFeedbackSent: () => void;
}

export function Form({ feedbackType, onFeedbackCanceled, onFeedbackSent }: Props) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState<string>('');
  const [isSendingFeedback, setIsSendingFeedback] = useState<boolean>(false);

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  function handleTakeScreenshot() {
    captureScreen({
      format: 'jpg',
      quality: 0.8
    })
    .then(uri => setScreenshot(uri))
    .catch(error => console.log(error));
  }

  function handleRemoveScreenshot() {
    setScreenshot(null);
  }

  async function handleSendFeedback() {
    if (isSendingFeedback) return;
    setIsSendingFeedback(true);

    try {
      await api.post('/feedbacks', {
        type: feedbackType,
        screenshot,
        comment
      });
    } catch (error) {
      setIsSendingFeedback(false);
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image source={feedbackTypeInfo.image} style={styles.image} />
          <Text style={styles.titleText}>{feedbackTypeInfo.title}</Text>
        </View>
      </View>

      <TextInput
        multiline
        style={styles.input}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
        onChangeText={setComment}
      />

      <View style={styles.footer}>
    	  <ScreenshotButton
          onTakeShot={handleTakeScreenshot}
          onRemoveShot={handleRemoveScreenshot}
          screenshot={screenshot}
        />
        <Button 
          onPress={handleSendFeedback}
          isLoading={isSendingFeedback}
        />
      </View>
    </View>
  );
}