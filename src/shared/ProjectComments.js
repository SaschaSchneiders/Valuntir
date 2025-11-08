import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProjectComments({ comments = [] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!comments || comments.length === 0) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.header}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <View style={styles.headerLeft}>
          <Ionicons name="chatbubbles-outline" size={20} color="#000" />
          <Text style={styles.headerTitle}>Projekterfahrungen</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{comments.length}</Text>
          </View>
        </View>
        <Ionicons 
          name={isExpanded ? "chevron-up" : "chevron-down"} 
          size={24} 
          color="#666" 
        />
      </TouchableOpacity>

      {isExpanded && (
        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={true}
        >
          {comments.map((item, index) => (
            <View 
              key={item.id} 
              style={[
                styles.commentItem,
                index === comments.length - 1 && styles.commentItemLast
              ]}
            >
              <View style={styles.commentHeader}>
                <View style={styles.commentRating}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text style={styles.commentRatingText}>{item.rating}/10</Text>
                </View>
                <Text style={styles.commentDate}>
                  {new Date(item.date).toLocaleDateString('de-DE', { 
                    month: 'short', 
                    year: 'numeric' 
                  })}
                </Text>
              </View>
              <Text style={styles.commentText}>{item.comment}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 32,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#F8F9FA',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  badge: {
    backgroundColor: '#000',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 24,
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFF',
  },
  content: {
    maxHeight: 400,
    padding: 16,
    paddingTop: 12,
  },
  commentItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  commentItemLast: {
    borderBottomWidth: 0,
    marginBottom: 0,
    paddingBottom: 0,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  commentRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  commentRatingText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000',
  },
  commentDate: {
    fontSize: 12,
    color: '#999',
  },
  commentText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});



