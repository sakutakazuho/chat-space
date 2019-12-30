## DB設計

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|

|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|


### Association
- belongs_to :group
- belongs_to :user



## usersテーブル

|Column|Type|Options|
|------|----|-------|

|name|string|null: false, defalut:|
|email|string|null: false, defalut:|

### Association

- has_many :messages
- add_index :users, :name, unique: true
- add_index :users, :email, unique: true
- has_many :groups, through: :group_users
-  has_many :group_users





## messageテーブル

|Column|Type|Options|
|------|----|-------|

|user_id|references|null: false, foreign_key: true, index true|
|group_id|references|null: false, foreign_key: true, index true|
|body|text| 
|image|string| 



### Association
- belongs_to :group
- belongs_to :user



## groupsテーブル

|Column|Type|Options|
|------|----|-------|

|name|string|null: false, default:|


### Association

- has_many :messages
- has_many :users, through: :group_users
- has_many :group_users

