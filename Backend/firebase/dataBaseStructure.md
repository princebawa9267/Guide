questions/
question_id → {
question_id,
user_id,
headline,
description,
tags,
image_url,
upvotes: 0,
upvoted_by: [],
reported: false,
created_at: new Date().toISOString(),
comments: []
}

comments/
comment_id → {
comment_id,
user_id,
text,
parent_comment_id,
question_id: req.params.questionId,
upvotes: 0,
upvoted_by: [],
child_comments: [],
created_at: new Date().toISOString()
}

reviews/
review_id -> {
review_id,
restaurant_id,
user_id,
open_hours: open_hours || '',
images: images || [],
review_text,
price_range,
food_quality,
longitude,
latitude,
cleanliness_score,
service_score,
upvotes: 0,
upvoted_by: [],
best_dishes
}

users/
user_id -> {
user_id,
name,
email,
location,
checkmarked_locations: [],
preferences: {},
popularity_score: 0
}
