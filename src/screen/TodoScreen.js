import React, { useState } from "react";
import {
	FlatList,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { IconButton } from "react-native-paper";

const TodoScreen = () => {
	//init local states
	const [todo, setTodo] = useState("");
	const [todoList, setTodoList] = useState([]);
	const [editedTodo, setEditedTodo] = useState(null);

	//Handle add todo
	const handleAddTodo = () => {
		if (todo === "") {
			return;
		}
		setTodoList([...todoList, { id: Date.now().toString(), title: todo }]);
		setTodo("");
	};

	//Handle Delete
	const handleDeleteTodo = id => {
		const updatedTodoList = todoList.filter(todo => todo.id !== id);
		setTodoList(updatedTodoList);
	};

	//Handle Edit
	const handleEditTodo = todo => {
		setEditedTodo(todo);
		setTodo(todo.title);
	};

	//Handle Update
	const handleUpdateTodo = () => {
		const updatedTodos = todoList.map(item => {
			if (item.id === editedTodo.id) {
				return { ...item, title: todo };
			}
			return item;
		});
		setTodoList(updatedTodos);
		setEditedTodo(null);
		setTodo("");
	};

	const renderTodos = ({ item, index }) => {
		return (
			<View
				style={{
					backgroundColor: "#00BD9D",
					borderRadius: 6,
					paddingHorizontal: 6,
					paddingVertical: 12,
					marginBottom: 12,
					flexDirection: "row",
					alignItems: "center",
					shadowColor: "#000",
					shadowOffset: { width: 0, height: 2 },
					shadowOpacity: 1,
				}}>
				<Text
					style={{
						color: "#fff",
						fontSize: 20,
						fontWeight: "800",
						flex: 1,
					}}>
					{item.title}
				</Text>
				<IconButton
					icon="pencil"
					iconColor="#fff"
					onPress={() => handleEditTodo(item)}
				/>
				<IconButton
					icon="trash-can"
					iconColor="#fff"
					onPress={() => handleDeleteTodo(item.id)}
				/>
			</View>
		);
	};
	return (
		<View style={{ marginHorizontal: 16 }}>
			<TextInput
				style={{
					borderWidth: 2,
					borderColor: "#000",
					borderRadius: 6,
					paddingVertical: 6,
					paddingHorizontal: 16,
					marginTop: 40,
				}}
				placeholder="Agregar Tarea"
				value={todo}
				onChangeText={userText => setTodo(userText)}></TextInput>

			{editedTodo ? (
				<TouchableOpacity
					style={{
						backgroundColor: "#1e90ff",
						borderRadius: 6,
						paddingVertical: 12,
						marginVertical: 34,
						alignItems: "center",
					}}
					onPress={() => handleUpdateTodo()}>
					<Text
						style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
						Save
					</Text>
				</TouchableOpacity>
			) : (
				<TouchableOpacity
					style={{
						backgroundColor: "#1e90ff",
						borderRadius: 6,
						paddingVertical: 12,
						marginVertical: 34,
						alignItems: "center",
					}}
					onPress={() => handleAddTodo()}>
					<Text
						style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
						Add
					</Text>
				</TouchableOpacity>
			)}

			{/* Renderisar TODOLIST */}
			<FlatList data={todoList} renderItem={renderTodos} />
		</View>
	);
};

export default TodoScreen;

const styles = StyleSheet.create({});
