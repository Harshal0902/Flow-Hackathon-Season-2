import numpy as np

user_item_matrix = np.array([
    [4, 5, 0, 3, 0],
    [5, 0, 4, 0, 2],
    [0, 3, 0, 4, 4],
    [5, 0, 3, 0, 0],
    [0, 4, 2, 0, 5]
])

def cosine_similarity(matrix):
    norm = np.linalg.norm(matrix, axis=1)
    norm_matrix = matrix / norm[:, None]
    similarity_matrix = np.dot(norm_matrix, norm_matrix.T)
    return similarity_matrix

similarity_matrix = cosine_similarity(user_item_matrix)

def generate_recommendations(user_index, matrix, similarity_matrix, top_n=3):
    user_ratings = matrix[user_index]
    similarity_scores = similarity_matrix[user_index]
    sorted_indices = np.argsort(similarity_scores)[::-1]
    top_indices = sorted_indices[1:top_n+1]
    recommendations = np.where(user_ratings == 0, matrix[top_indices].mean(axis=0), 0)
    return recommendations

user_index = 0
recommendations = generate_recommendations(user_index, user_item_matrix, similarity_matrix, top_n=3)
print("Recommended items for user", user_index)
print(recommendations)
